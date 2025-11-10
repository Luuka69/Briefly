import os
from typing import List, Optional

import torch
from langchain.schema import Document
from transformers import AutoModel, AutoTokenizer


class TuniBertResponder:
  """Lightweight helper that uses AhmedBou/TuniBert embeddings to rank docs."""

  def __init__(
      self,
      model_name: Optional[str] = None,
      max_length: int = 512,
  ) -> None:
    self.model_name = model_name or os.getenv("TUNISIAN_MODEL_NAME", "AhmedBou/TuniBert")
    self.max_length = max_length
    self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
    self.model = AutoModel.from_pretrained(self.model_name)
    self.model.to(self.device)
    self.model.eval()

  def _embed(self, text: str) -> torch.Tensor:
    tokens = self.tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding="max_length",
        max_length=self.max_length,
    )
    tokens = {k: v.to(self.device) for k, v in tokens.items()}
    with torch.no_grad():
      outputs = self.model(**tokens)
    # CLS token
    embedding = outputs.last_hidden_state[:, 0, :]
    return embedding.squeeze(0).cpu()

  def _cosine_similarity(self, a: torch.Tensor, b: torch.Tensor) -> float:
    a_norm = a / (a.norm() + 1e-8)
    b_norm = b / (b.norm() + 1e-8)
    return float(torch.matmul(a_norm, b_norm.T))

  def select_document(self, question: str, docs: List[Document]) -> Optional[Document]:
    if not docs:
      return None

    question_vec = self._embed(question)
    best_doc = None
    best_score = float("-inf")

    for doc in docs:
      snippet = doc.page_content[:1500]
      doc_vec = self._embed(snippet)
      score = self._cosine_similarity(question_vec, doc_vec)
      if score > best_score:
        best_doc = doc
        best_score = score

    return best_doc

  def format_answer(self, doc: Document) -> str:
    content = doc.page_content.strip().replace("\n", " ")
    snippet = content[:600] + ("…" if len(content) > 600 else "")
    title = doc.metadata.get("title") or "المصدر"
    return f"{title}: {snippet}"
