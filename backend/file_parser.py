import pdfplumber
import docx


# -------- Extract text from PDF --------
def extract_pdf(file_path):

    text = ""

    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""

    except Exception as e:
        print(f"Error reading PDF: {e}")

    return text


# -------- Extract text from DOCX --------
def extract_docx(file_path):

    text = ""

    try:
        doc = docx.Document(file_path)
        text = "\n".join([para.text for para in doc.paragraphs])

    except Exception as e:
        print(f"Error reading DOCX: {e}")

    return text