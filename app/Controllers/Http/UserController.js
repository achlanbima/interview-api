'use strict'

const { validate } = use('Validator')

const User = use('App/models/User')

class UserController {
  
  
  async store({ response, request }){

    const rules = {
      email: 'required|email|unique:users,email',
      username: 'required|unique:users',
      phone_number: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      if(validation._errorMessages[0].validation == "email"){
        return response.status(500).send({message:"Email harus berformat email (**@**.**)"})  
      }else if(validation._errorMessages[0].validation == "required"){
        return response.status(500).send({message: `${validation._errorMessages[0].field} tidak boleh kosong`})
      }else if(validation._errorMessages[0].validation == "unique"){
        return response.status(500).send({message: `${validation._errorMessages[0].field} Sudah Ada`})
      }
    }

    const {username,email,phone_number} = request.only([
      'username',
      'email',
      'phone_number'
    ])

    

    const user = await User.create({
      username,
      email,
      phone_number
    })

    return response.status(200).send({message: "Register Success", data:user})
 
  }


}

module.exports = UserController
