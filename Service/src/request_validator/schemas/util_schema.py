import re
from validate_email import validate_email

NAME_CHAR_LIMIT = 32
MIN_BUY_POWER = 1
MAX_BUY_POWER = 1000000
VALID_ACTION_TYPES = ['BUY', 'SELL']

def validateEmail(emailStr, field, errors):
   if not validate_email(emailStr):
      errors.append({
         'InvalidField': field.name + " is an invalid address"
      })
   
   return errors


def validatePassword(passwordStr, field, errors):
   if not re.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$", passwordStr):
      errors.append({
         'InvalidField': field.name + " must have 8 characters, 1 uppercase letter " +
            "1 lowercase letter, and 1 number"
      })
   
   return errors


def validateName(nameStr, field, errors):
   if type(nameStr) != str:
      errors.append({'InvalidField' : field.name + ' is not a string or formatted incorrectly'})
   elif type(nameStr) == str: 
      if len(nameStr) > NAME_CHAR_LIMIT:
         errors.append({'InvalidField' : field.name + ' is too long - must be under 32 characters'})
      elif len(nameStr) == 0:
         errors.append({'InvalidField' : field.name + ' must not be empty'})

   return errors


def validateLength(lengthStr, field, errors):
   if type(lengthStr) != str or lengthStr not in ['day', 'week', 'month', 'year', 'recent']:
      errors.append({
         'InvalidField': field.name + " is not one of 'day', 'week', 'month', 'year', or 'recent'"
      })
   
   return errors


def validateBuyPower(buyPower, field, errors):
   if type(buyPower) != int or buyPower < MIN_BUY_POWER or buyPower > MAX_BUY_POWER:
      errors.append({
         'InvalidField' : field.name + ' must be an integer greater than 1 and less than 1000000'
      })

   return errors


def validatePosInt(integer, field, errors):
   if type(integer) != int or integer <= 0:
      errors.append({
         'InvalidField' : field.name + ' must be a positive integer'
      })

   return errors


def validateAction(action, field, errors):
   if type(action) != str or action not in VALID_ACTION_TYPES:
      errors.append({
         'InvalidField' : field.name + ' must be a valid action: ' + ", ".join(VALID_ACTION_TYPES)
      })