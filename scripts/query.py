from dotenv import load_dotenv
import sys
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI

load_dotenv()

template = """You are a world class researcher, who can do detailed research on any syllabus text and produce facts based results; 
you do not make things up, you will try as hard as possible to gather facts & data to back up the research
            
Please make sure you complete the objective above with the following rules:
1/ You should do enough research to gather as much information as possible about the objective
2/ After reading the text, you should think "is there any new things i should add based on the data I collected to increase research quality?" If answer is yes, continue; But don't do this more than 3 iterations
3/ You should not make things up, you should only write facts & data that you have gathered

Please analyze the provided syllabus text while following the rules and distill the essential information about the course professor, the assignments, and the content of each chapter. For each category, please create a structured summary. If certain details are not included in the syllabus, denote this with "Information not specified." Do not infer or deduce information not present in the text; only extract and report the facts given.

<Professor Information>:
- Full Name:
- Office Hours Schedule:
- Email and/or Telephone Contact:
- Academic Department:

<Assignments Overview>:
Extract and enumerate the assignments, including specific details as presented:
- Title of Assignment:
  - Nature of Assignment (e.g., Reading, Essay, Project):
  - Scheduled Due Date:
  - Brief Description:
  - Required Submission Format:
  - Criteria for Evaluation:

Remember to maintain the original meaning and context as you summarize, and refrain from adding interpretations or extraneous details not contained in the syllabus text.
Do not infer or deduce information not present in the text; only extract and report the facts given

Begin your analysis after this line:
---
{syllabus}
"""


def query_language_model(text):
    prompt_template = PromptTemplate(input_variables=["syllabus"], template=template)

    llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-16k-0613")
    return llm.predict(prompt_template.format(syllabus=text))
