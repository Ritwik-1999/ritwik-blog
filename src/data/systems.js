export const systems = [
  {
    index: "01",
    title: "Sentinel Transfer Architecture",
    philosophy: "Secure data movement designed for hostile operational environments.",
    description:
      "Built a secure large-scale file transfer workflow that moved scanned files from an isolated landing zone into a trusted internal environment using malware scan validation, private connectivity, blob tags, and automated transfer logic.",
    stack: [
      "Azure Storage",
      "Defender",
      "AzCopy",
      "Private Endpoints",
      "Blob Tags",
      "Log Analytics",
    ],
  },
  {
    index: "02",
    title: "Enterprise Provisioning Engine",
    philosophy: "Infrastructure should become more predictable as it scales, not less.",
    description:
      "Built Terraform and Ansible-driven workflows for provisioning large production environments across cloud and hybrid infrastructure, turning repeatable deployment patterns into controlled automation systems.",
    stack: [
      "Terraform",
      "Ansible",
      "Azure",
      "AWS",
      "Azure DevOps",
      "PowerShell",
    ],
  },
  {
    index: "03",
    title: "Cloud Governance Validation Layer",
    philosophy: "The cheapest failure is the one caught before production drift begins.",
    description:
      "Developed automated validation checks for cloud resources, tagging standards, provisioning outputs, and post-deployment readiness, reducing the need for manual infrastructure inspection.",
    stack: [
      "Python",
      "PowerShell",
      "Azure CLI",
      "Terraform",
      "CI/CD",
    ],
  },
  {
    index: "04",
    title: "Kubernetes Operations Toolkit",
    philosophy: "Reliability improves when operational knowledge becomes repeatable.",
    description:
      "Created scripts, runbooks, and troubleshooting workflows for diagnosing Kubernetes workloads and maintaining platform reliability across AKS and EKS environments.",
    stack: [
      "Kubernetes",
      "AKS",
      "EKS",
      "Helm",
      "Bash",
      "Monitoring",
    ],
  },
]