import PyPDF2
import sys
from query import query_language_model


def read_pdf_page_by_page(pdf_path):
    """
    A generator function that lazily reads a PDF page by page.

    :param pdf_path: Path to the PDF file to be read.
    """
    pdf_text = ""
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            pdf_text += page.extract_text()
    return pdf_text


def main(pdf_path):
    with open(output_path, "w") as file:
        try:
            model_response = query_language_model(read_pdf_page_by_page(pdf_path))
            print(model_response, file=file)

        except Exception as e:
            print(f"An error occurred: {e}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python parse_pdf.py [pdf_path] [output_path]")
        sys.exit(1)
    pdf_path = sys.argv[1]
    output_path = sys.argv[2]
    main(pdf_path)
