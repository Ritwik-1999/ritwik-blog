from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from pathlib import Path

doc=Document()
s=doc.sections[0]
s.page_width=Inches(8.5); s.page_height=Inches(11)
s.top_margin=s.bottom_margin=Inches(.6)
s.left_margin=s.right_margin=Inches(.7)
for name in ['Normal','List Bullet']:
 st=doc.styles[name]; st.font.name='Calibri'; st.font.size=Pt(11)
 st.paragraph_format.space_after=Pt(4)
 st.paragraph_format.line_spacing=1.02
for name,size in [('Title',22),('Heading 1',12),('Heading 2',11)]:
 st=doc.styles[name]; st.font.name='Calibri'; st.font.size=Pt(size); st.font.color.rgb=RGBColor(0,0,0)
 st.font.bold=True; st.paragraph_format.space_before=Pt(9); st.paragraph_format.space_after=Pt(5)
doc.styles['Title'].paragraph_format.space_before=Pt(0)
for st in doc.styles:
 for border in list(st.element.iter(qn('w:pBdr'))):
  border.getparent().remove(border)
def p(t,style=None):
 a=doc.add_paragraph(t,style); a.paragraph_format.widow_control=True; return a
def bullet(t):
 a=p(t,'List Bullet'); a.paragraph_format.keep_together=True
def role(title,company,date):
 p(title+' | '+company,'Heading 2')
 a=p(date); a.paragraph_format.keep_with_next=True; a.paragraph_format.space_after=Pt(5)
def skill(label,text):
 a=p(''); a.add_run(label+': ').bold=True; a.add_run(text)

p('Sai Ritwik Reddy','Title')
a=p('DevOps and Automation Engineer | Microsoft Azure'); a.runs[0].bold=True
p('Hoboken, NJ | +1 551-358-1756 | rritwik586@gmail.com')
p('sai-ritwik-reddy.vercel.app')
p('Professional Summary','Heading 1')
p('DevOps and cloud infrastructure engineer with experience supporting Azure environments, CI/CD delivery, Terraform automation, Docker and Kubernetes workloads, and production reliability. Built deployment workflows using GitHub Actions, Jenkins, and Azure DevOps-aligned practices. Provisioned 700+ servers and automated validation across 1,000+ cloud resources. Background spans regulated healthcare infrastructure and cloud operations for Sunrun, including networking, access governance, observability, and release validation.')
p('Technical Skills','Heading 1')
skill('Azure and networking','Microsoft Azure, Virtual Machines, Storage, VNets, NSGs, Private Endpoints, Azure CLI, Azure RBAC, DNS, private connectivity; cloud and hybrid environments')
skill('CI/CD and version control','Azure DevOps (ADO), GitHub, GitHub Actions, Jenkins, GitLab CI/CD, build and release automation, approval gates, environment promotion, deployment validation, rollback readiness')
skill('Infrastructure as Code and automation','Terraform, reusable infrastructure modules, Ansible, Python, PowerShell, Bash, configuration validation, provisioning automation')
skill('Containers and operations','Linux, Docker, Kubernetes, Azure Kubernetes Service (AKS)-aligned workloads, manifests, services, ingress, RBAC, rolling updates, runtime troubleshooting')
skill('Monitoring and security','Azure Monitor, Log Analytics, CloudWatch, centralized logging, alerts, incident response, root cause analysis, IAM, least privilege, secrets handling')
p('Professional Experience','Heading 1')
role('Cloud Infrastructure Engineer','Molina Healthcare','California, USA | September 2024 - March 2026')
for t in [
'Supported Azure-focused healthcare infrastructure and production systems, connecting infrastructure automation, CI/CD validation, networking, monitoring, and security controls.',
'Provisioned and orchestrated 700+ production-grade servers using Terraform, Ansible, PowerShell, Bash, Python, and cloud CLI automation to standardize configuration and operational handoff.',
'Built CI/CD and infrastructure deployment workflows using GitHub Actions, Jenkins, Terraform, Ansible, and Azure DevOps-aligned practices, including approval gates, environment promotion, rollback preparation, and post-deployment verification.',
'Automated validation across 1,000+ cloud resources for health checks, access, tagging, storage readiness, network dependencies, monitoring coverage, and deployment evidence.',
'Troubleshot Kubernetes and Docker workload issues involving deployments, DNS, service connectivity, RBAC, runtime configuration, scaling, logs, and rollback paths.',
'Led Azure landing-zone and secure data ingestion workflows for Bright HealthCare and ConnectiCare integrations, supporting access governance, metadata validation, monitoring, and audit evidence.'
]: bullet(t)

doc.add_page_break()
role('Cloud Operations Engineer','GenPx Inc | Client Sunrun','Irving, Texas | December 2022 - September 2024')
for t in [
'Designed and maintained Azure and AWS environments supporting infrastructure automation, Kubernetes workloads, CI/CD delivery, networking, monitoring, and production application reliability.',
'Built modular Terraform and Ansible workflows to provision compute, storage, IAM/RBAC, VNet/VPC networking, private connectivity, monitoring, and reusable infrastructure dependencies.',
'Built GitHub Actions and Jenkins workflows and Azure DevOps- and GitLab CI/CD-aligned delivery workflows for infrastructure deployment, build checks, application release validation, approval gates, environment promotion, and post-deployment verification.',
'Supported Docker and Kubernetes workloads, including AKS-aligned patterns, by reviewing manifests, container health, service connectivity, DNS, runtime settings, scaling, rollouts, and rollback readiness.',
'Validated cloud networking across VNets/VPCs, subnets, route tables, NSGs, security groups, DNS, private connectivity, firewall rules, and secure application access paths.',
'Developed Python, Bash, PowerShell, and cloud CLI automation for provisioning checks, configuration audits, resource inventory, access reviews, monitoring validation, and deployment readiness.',
'Implemented monitoring and alerting with Azure Monitor, Log Analytics, and CloudWatch; supported incident triage, root cause analysis, operational reporting, and production runbooks.',
'Partnered with development, infrastructure, QA, and security teams to troubleshoot releases, validate application and database dependencies, and improve deployment reliability.'
]: bullet(t)
role('Cloud Engineer','Cognizant Technology Solutions','Hyderabad, India | December 2019 - August 2022')
for t in [
'Supported Jenkins and GitHub-based CI/CD workflows, including build validation, deployment approvals, rollback support, release documentation, and technical handoff.',
'Developed AWS automation using Lambda, S3, IAM, CloudWatch, Python, and Bash for monitoring, deployment support, and cloud service integration.',
'Troubleshot Linux, Docker, Kubernetes, API failures, deployment errors, runtime issues, database connectivity, and permissions; built Python tools for log analysis and automated diagnostics.',
'Built backend services and microservices using Java, Spring Boot, Go, and REST APIs, improving API response performance by 25%.'
]: bullet(t)
p('Selected Project','Heading 1')
a=p('Azure DevOps and Kubernetes Delivery Framework'); a.runs[0].bold=True
p('Designed deployment support patterns using Azure, Terraform, Ansible, Docker, Kubernetes, Azure DevOps, GitHub Actions, Jenkins, and GitOps workflows, covering environment promotion, release validation, rollback readiness, monitoring, and operational documentation.')
p('Education','Heading 1')
a=p('Master of Science in Computer Science | Stevens Institute of Technology'); a.runs[0].bold=True
p('Hoboken, NJ | GPA 3.78/4 | Provost Master\'s Scholarship')
a=p('Bachelor of Technology in Electronics and Communication Engineering | Jain University'); a.runs[0].bold=True
p('Bengaluru, India | GPA 7.8/10 | Minor in Computer Science')
doc.core_properties.title='Sai Ritwik Reddy Azure DevOps Resume'
doc.core_properties.author='Sai Ritwik Reddy'
out=Path('output/documents/Sai_Ritwik_Reddy_Azure_DevOps_Resume.docx')
doc.save(out)
print(out.resolve())
