data "aws_ami" "ubuntu" {
    most_recent = true

    filter {
        name   = "name"
        values = ["ubuntu/images/hvm-ssd/ubuntu-*20*-amd64-server-*"]
    }

    filter {
        name   = "virtualization-type"
        values = ["hvm"]
    }

    owners = ["099720109477"] # Canonical
}

data "template_file" "user_data" {
    template = file("${path.module}/setup-server.yaml")
    vars = {
        dockerComposeFile: base64encode(templatefile("${path.module}/docker-compose.yml", {
            projectName: var.project-name
            branch: var.branch
            awsAccessKeyId: var.aws-access-key-id
            awsSecretAccessKey: var.aws-secret-access-key
        }))
        dockerReadToken: var.DOCKER_READONLY_TOKEN
    }
}

resource "aws_instance" "server" {
    ami                         = data.aws_ami.ubuntu.id
    instance_type               = "t2.micro"
    associate_public_ip_address = true
    user_data                   = data.template_file.user_data.rendered
    security_groups = [aws_security_group.sg.name]
    tags = {
        Name = "${terraform.workspace}-server"
    }
    root_block_device {
        delete_on_termination = true
        volume_size = 16
        volume_type = "gp2"
    }
}

resource "aws_security_group" "sg" {
    name        = "${terraform.workspace}-sg"
    egress = [
        {
            description      = "for all outgoing traffics"
            from_port        = 0
            to_port          = 0
            protocol         = "-1"
            cidr_blocks      = ["0.0.0.0/0"]
            ipv6_cidr_blocks = ["::/0"]
            prefix_list_ids  = []
            security_groups  = []
            self             = false
        }
    ]

    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
    ingress {
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "${terraform.workspace}-sg"
    }
}
