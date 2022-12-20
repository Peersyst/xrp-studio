data "aws_iam_policy_document" "server" {
  statement {
    effect = "Allow"
    actions = [
      "secretsmanager:GetSecretValue",
    ]
    resources = [
      "${data.aws_secretsmanager_secret.secrets.arn}*"
    ]
  }
}

resource "aws_iam_policy" "server" {
  name = "${var.project_name}Policy"
  policy = data.aws_iam_policy_document.server.json
}

resource "aws_iam_role" "server" {
  name = "${var.project_name}Role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "server" {
  role       = aws_iam_role.server.name
  policy_arn = aws_iam_policy.server.arn
}

resource "aws_iam_instance_profile" "server" {
  role = aws_iam_role.server.name
}
