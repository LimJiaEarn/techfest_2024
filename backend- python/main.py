# To read the PDF
import PyPDF2
# To analyze the PDF layout and extract text
from pdfminer.high_level import extract_pages, extract_text
from pdfminer.layout import LTTextContainer, LTChar, LTRect, LTFigure
# To extract text from tables in PDF
import pdfplumber
# To extract the images from the PDFs
from PIL import Image
from pdf2image import convert_from_path
# To perform OCR to extract text from images
import pytesseract
# To remove the additional created files
import os

from util import *
import json

def main(pdf_path):
    
        # Create a pdf file object
    pdfFileObj = open(pdf_path, 'rb')
    # Create a pdf reader object
    pdfReaded = PyPDF2.PdfReader(pdfFileObj)
    # Create the dictionary to extract text from each image
    text_per_page = {}
    # Create a boolean variable for image detection
    image_flag = False

        # We extract the pages from the PDF
    for pagenum, page in enumerate(extract_pages(pdf_path)):

        # Initialize the variables needed for the text extraction from the page
        pageObj = pdfReaded.pages[pagenum]
        page_text = []
        line_format = []
        text_from_images = []
        text_from_tables = []
        page_content = []
        # Initialize the number of the examined tables
        table_in_page= -1
        # Open the pdf file
        pdf = pdfplumber.open(pdf_path)
        # Find the examined page
        page_tables = pdf.pages[pagenum]
        # Find the number of tables in the page
        tables = page_tables.find_tables()
        if len(tables)!=0:
            table_in_page = 0

        # Extracting the tables of the page
        for table_num in range(len(tables)):
            # Extract the information of the table
            table = extract_table(pdf_path, pagenum, table_num)
            # Convert the table information in structured string format
            table_string = table_converter(table)
            # Append the table string into a list
            text_from_tables.append(table_string)

        # Find all the elements
        page_elements = [(element.y1, element) for element in page._objs]
        # Sort all the element as they appear in the page
        page_elements.sort(key=lambda a: a[0], reverse=True)


        # Find the elements that composed a page
        for i,component in enumerate(page_elements):
            # Extract the element of the page layout
            element = component[1]

            # Check the elements for tables
            if table_in_page == -1:
                pass
            else:
                if is_element_inside_any_table(element, page ,tables):
                    table_found = find_table_for_element(element,page ,tables)
                    if table_found == table_in_page and table_found != None:
                        page_content.append(text_from_tables[table_in_page])
                        page_text.append('table')
                        line_format.append('table')
                        table_in_page+=1
                    # Pass this iteration because the content of this element was extracted from the tables
                    continue

            if not is_element_inside_any_table(element,page,tables):

                # Check if the element is text element
                if isinstance(element, LTTextContainer):
                    # Use the function to extract the text and format for each text element
                    (line_text, format_per_line) = text_extraction(element)
                    # Append the text of each line to the page text
                    page_text.append(line_text)
                    # Append the format for each line containing text
                    line_format.append(format_per_line)
                    page_content.append(line_text)


                # Check the elements for images
                if isinstance(element, LTFigure):
                    # Crop the image from PDF
                    crop_image(element, pageObj)
                    # Convert the croped pdf to image
                    convert_to_images('cropped_image.pdf')
                    # Extract the text from image
                    image_text = image_to_text('PDF_image.png')
                    text_from_images.append(image_text)
                    page_content.append(image_text)
                    # Add a placeholder in the text and format lists
                    page_text.append('image')
                    line_format.append('image')
                    # Update the flag for image detection
                    image_flag = True


        # Create the key of the dictionary
        dctkey = 'Page_'+str(pagenum)
        # Add the list of list as value of the page key
        text_per_page[dctkey]= [page_text, line_format, text_from_images,text_from_tables, page_content]

        # Close the pdf file object
        pdfFileObj.close()
        # Delete the additional files created if image is detected
        if image_flag:
            os.remove('cropped_image.pdf')
            os.remove('PDF_image.png')

    #Get total pages of pdf
    num_of_pages = len(pdfReaded.pages)
    return text_per_page,num_of_pages
    
def analyse_pdf(text_per_page,num_of_pages):
    pdf_pages = []
    for num in range(num_of_pages):
        pdf_pages.append(f'Page_{num}')
    obj_list=[]
    persons_list= []
    orgs_list = []
    for pdf_page in pdf_pages:
        cleaned_text = clean_text(text_per_page[pdf_page][0])
        #Convert list to string
        cleaned_text_str = json.dumps(cleaned_text)
        #Run spacy NLP model
        spacy_obj = nlp_extract(cleaned_text_str)
        persons = find_persons(spacy_obj)
        orgs = find_orgs(spacy_obj)

        if (pdf_page == 'Page_0'):
            #If first page person label should be personal info
            persons_list.append(persons)
        else:
            #Else personal label should be org keywords
            orgs_list.append(persons)
            orgs_list.append(orgs)

    #Merge org_list together
    single_org_list =' '.join(map(str, orgs_list))
    return persons_list, orgs_list