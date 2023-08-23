from typing import Union

from fastapi import FastAPI

app = FastAPI()

import os
import re

from playwright.sync_api import sync_playwright

from langchain import HuggingFaceHub, LLMChain, PromptTemplate

os.environ["GOOGLE_CSE_ID"] = "038eaa6cdad1747f4"
os.environ["GOOGLE_API_KEY"] = "AIzaSyCb_ieYZ5FihLzImP9RwyS6Vp-PMQ5moOE"
API_KEY="AIzaSyCb_ieYZ5FihLzImP9RwyS6Vp-PMQ5moOE"
CSE_ID="038eaa6cdad1747f4"

llm = HuggingFaceHub(
        repo_id="OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
        task="text-generation",
        huggingfacehub_api_token="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",
        model_kwargs={
            "temperature": 0.7,
            "max_length": 450,
            "truncate": 1024,
            "max_new_tokens": 1048,
        },
    )

def get_ai_response(template, content):
    model_template = f"<|prompter|>{template}<|endoftext|>"
    prompt = PromptTemplate(template=model_template, input_variables=list(content.keys()))
    llm_chain = LLMChain(prompt=prompt, llm=llm, verbose=True)
    return llm_chain.run(content)

def google_search(topic: str, **kwargs):
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        
        page.goto(f"https://www.google.com/search?q={topic}")
        page.wait_for_selector("#center_col")
        links = page.locator("#center_col").get_by_role("link")
        count = links.count()
        headings_list = []
        for index in range(count-5):
            heading = links.nth(index).text_content()
            try:
                int(heading)
            except ValueError:
                split_heading = heading.split("http")[0]
                headings_list.append(split_heading)
        browser.close()
        return headings_list[:5]

def starts_with_roman_numeral(text):
    roman_numeral_pattern = r"^(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX|XXI|XXII|XXIII|XXIV|XXV|XXVI|XXVII|XXVIII|XXIX|XXX|XXXI|XXXII|XXXIII|XXXIV|XXXV|XXXVI|XXXVII|XXXVIII|XXXIX|XL|XLI|XLII|XLIII|XLIV|XLV|XLVI|XLVII|XLVIII|XLIX|L|LI|LII|LIII|LIV|LV|LVI|LVII|LVIII|LIX|LX|LXI|LXII|LXIII|LXIV|LXV|LXVI|LXVII|LXVIII|LXIX|LXX|LXXI|LXXII|LXXIII|LXXIV|LXXV|LXXVI|LXXVII|LXXVIII|LXXIX|LXXX|LXXXI|LXXXII|LXXXIII|LXXXIV|LXXXV|LXXXVI|LXXXVII|LXXXVIII|LXXXIX|XC|XCI|XCII|XCIII|XCIV|XCV|XCVI|XCVII|XCVIII|XCIX)\."

    match = re.match(roman_numeral_pattern, text)
    if match:
        return True
    return False
        

def get_similar_headings(topic):
    search_string = f"Articles related to :{topic}"
    formatted_string = search_string.replace(" ", "+")
    return google_search(formatted_string)

def create_outline(headings, topic):
    """
    This function 
    """
    prompt_sort_headings = """You are an expert at creating outlines for blogs. 
        Your task is to create an outline for a new article about {topic} with total word count 1000. 
        I will provide you a list of headlines extracted from similar blog articles. 
        Run through them and create an outline for a new blog post taking only the most suitable headlines without duplication keeping in mind the specified word count.
        Here are all the headlines in the input file:
        "{headings}".
        Output the complete blog post structure and give me outline in a list format.
        Assign a word count per sub-heading based on the relative importance of the sub-heading for the main topic.
        """
    return get_ai_response(prompt_sort_headings, {"topic":topic, "headings": headings})

def clean_outline(outline):
    counter = -1
    mapping_dict = []
    for item in outline.split("\n")[1:]:
        if starts_with_roman_numeral(item):
            mapping_dict.append({'heading': item, 'sub-heading': []})
            counter+=1
        elif item:
            mapping_dict[counter]['sub-heading'].append(item)
    
    return mapping_dict

def get_blog_content(topic, overall_outline):
    content = ''
    for item in overall_outline:
        prompt = """You are an expert article and blog writer who writes user friendly articles.
                You have to write a blog post for a article with topic: {topic} and sub-heading: {sub_heading}"""
        content += get_ai_response(prompt, {"topic": topic,'sub_heading': item['sub-heading']})
    return content

def create_unique_article(topic1):
    topic = "Data Security in the Manufacturing Business – Why It is Becoming Important"
    heading_content = ("Cyber Threats in the Manufacturing Industry \nThe Internet of Things in Manufacturing Plants \n Implementing Better Data Security for Your Company")
    headings = get_similar_headings(topic)
    outline = create_outline(headings, topic)
    # get key points
    # get sections based on outline
    # get content for each section based on key points
    # print(outline)
    cleaned_outline = clean_outline(outline)
    article = get_blog_content(topic,cleaned_outline)
    print(article)
    
    # print(outline)
    return


from pydantic import BaseModel
class Topic(BaseModel):
    name: str



@app.post("/generate-article/")
def generate_article(topic: Topic):
    article = create_unique_article(topic.name)
    return {"generated-article": article}
