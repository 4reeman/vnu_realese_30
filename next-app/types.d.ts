export type aboutNode = {
    "base_fields": Base,
    "config_fields": aboutConfig
}

export type achievementNode = {
    "base_fields": Base,
    "config_fields": achievementConfig
}

export type headOfTheDepartmentNode = {
    "base_fields": Base,
    "config_fields": headDepartmentConfig
}

export type answerNode = {
    "base_fields": Base,
    "config_fields": answerConfig
}

export type feedbacksNode = {
    "base_fields": Base,
    config_fields: feedbackConfig
}

type Base = {
    "nid": string,
    "uuid": string,
    "vid": string,
    "langcode": string,
    "revision_timestamp": string,
    "status": string,
    "title": string,
    "created": string,
    "changed": string,
    "default_langcode": string,
    "revision_default": string,
    "revision_translation_affected": string
}

type feedbackConfig = {
    "body": {
        value: string,
        summary: string
    },
    "field_feedbacks_image": Image
    "field_stude": string
}

type aboutConfig = {
    "body": {
        value: string,
        summary: string
    },
    "field_about_image": Image
}

type answerConfig = {
    "body": {
        value: string,
        summary: string
    }
}

type achievementConfig = {
    field_achievement: {
        value: string
    },
    field_quantity: {
        value: string
    }
}

type headDepartmentConfig = {
    "body": {
        value: string,
        summary: string
    },
    "field_department_head_image": Image,
    "field_position_of_professor": string
}

type Image = {
    "alt": string,
    "attributes": [
        {
            "srcset": string,
            "media": string,
            "type": string
        }
    ]
}