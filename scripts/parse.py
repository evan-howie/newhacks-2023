import PyPDF2
import sys


def read_pdf_page_by_page(pdf_path):
    """
    A generator function that lazily reads a PDF page by page.

    :param pdf_path: Path to the PDF file to be read.
    """
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfFileReader(file)
        for page in range(reader.numPages):
            yield reader.getPage(page).extractText()


def main(pdf_path):
    for page_text in read_pdf_page_by_page(pdf_path):
        try:
            model_response = query_language_model(page_text)

            processed_text = model_response["data"]
            print(processed_text)
        except Exception as e:
            print(f"An error occurred: {e}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python parse_pdf.py [pdf_path]")
        sys.exit(1)
    pdf_path = sys.argv[1]
    main(pdf_path)
