from flask import Flask, render_template, request, jsonify

import re
import json

from app import app

@app.route('/compute_regex', methods=['POST'])
def parse_regex():
  data = request.json

  group_list = regex_search(**data)

  if group_list:
    return jsonify(group_list)

@app.route('/', methods=['GET'])
def home():
  return render_template('home.html')

def regex_search(regex_string, input_string, multiline_bool, dotall_bool, verbose_bool, ignorecase_bool, unicode_bool):
  highlighted_string = input_string
  flags = 0

  if multiline_bool:
    flags = re.M

  if dotall_bool:
    flags |= re.S

  if verbose_bool:
    flags |= re.X

  if ignorecase_bool:
    flags |= re.I

  if unicode_bool:
    flags |= re.U

  group_dict = {}
  match_c = 0

  try:
    regex_pattern = re.compile(regex_string, flags)
  except:
    return {'result':'error'}

  highlighted_string = regex_pattern.sub(r'<mark>\g<0></mark>', highlighted_string)

  for match in regex_pattern.finditer(input_string):
    group_dict[match_c] = []

    for group_c in range(0,len(match.groups())+1):
      group_dict[match_c].append({'span': match.span(group_c), 'group': match.group(group_c)})
    match_c = match_c + 1

  final_dict = {}
  final_dict['group_dict'] = group_dict
  final_dict['highlight'] = highlighted_string

  return final_dict
