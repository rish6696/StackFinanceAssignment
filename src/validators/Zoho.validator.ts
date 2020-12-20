import Joi,{ number, ObjectSchema } from '@hapi/joi'

export const insertRecordValidator:ObjectSchema= Joi.object({
    data:Joi.array().items({
        Company: Joi.string().required(),
        Last_Name: Joi.string().required(),
        First_Name: Joi.string().required(),
        Email: Joi.string().required(),
        State : Joi.string().required()
    }),
    trigger:Joi.array().items(Joi.string())
})


export const createNotesValidator:ObjectSchema=Joi.object({

    data:Joi.array().items({
        Note_Title: Joi.string().required(),
        Note_Content: Joi.string().required(),
        Parent_Id: Joi.string().required(),
        se_module: Joi.string().required()
    }),
})

export const createUsersValidator:ObjectSchema=Joi.object({

    users:Joi.array().items({
        role: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        profile:Joi.string().required()
    }),
})



