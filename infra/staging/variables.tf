variable "CLOUDFLARE_TOKEN" {
    sensitive = true
}

variable "DOCKER_READONLY_TOKEN" {
    sensitive = true
}

variable "SSH_PRIVATE_KEY" {
    sensitive = true
}

variable "aws-region" {
    default = "eu-west-1"
}

variable "aws-access-key-id" {
    type = string
    default = ""
    sensitive = true
}

variable "aws-secret-access-key" {
    type = string
    default = ""
    sensitive = true
}

variable "project-name" {
    type = string
    default = ""
    sensitive = true
}

variable "branch" {
    type = string
    default = ""
}
