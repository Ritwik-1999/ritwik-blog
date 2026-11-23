from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from pathlib import Path

out=Path(__file__).parent
d=Document()
s=d.sections[0]
s.top_margin=s.bottom_margin=Inches(.6)
s.left_margin=s.right_margin=Inches(.7)
s.page_width=Inches(8.5); s.page_height=Inches(11)
normal=d.styles['Normal']; normal.font.name='Calibri'; normal.font.size=Pt(11)
normal.paragraph_format.space_after=Pt(5)
normal.paragraph_format.line_spacing=1.02
for name in ['Title','Heading 1','Heading 2']:
 st=d.styles[name]; st.font.name='Calibri'; st.font.color.rgb=RGBColor(0,0,0)
 st.paragraph_format.keep_with_next=True
d.styles['Title'].font.size=Pt(23)
d.styles['Title'].paragraph_format.space_after=Pt(3)
d.styles['Heading 1'].font.size=Pt(11)
d.styles['Heading 1'].paragraph_format.space_before=Pt(10)
d.styles['Heading 1'].paragraph_format.space_after=Pt(5)
d.styles['Heading 2'].font.size=Pt(11)
d.styles['Heading 2'].paragraph_format.space_before=Pt(6)
d.styles['Heading 2'].paragraph_format.space_after=Pt(2)
def p(t='',style=None): return d.add_paragraph(t,style)
def heading(t): d.add_heading(t,1)
def bullet(t):
 x=p(t,'List Bullet'); x.paragraph_format.space_after=Pt(4)
 x.paragraph_format.keep_together=True
def job(title,company,location,dates):
 d.add_heading(title+' | '+company,2)
 x=p(location+' | '+dates); x.paragraph_format.space_after=Pt(5)
 x.paragraph_format.keep_with_next=True
 x.runs[0].italic=True; x.runs[0].font.size=Pt(10)

p('Sai Ritwik Reddy','Title')
p('Infrastructure Cloud Engineer | AWS and Azure | Terraform and Automation')
x=p('+1 551-358-1756 | ritwikreddy615@gmail.com | Jersey City, NJ | ritwikreddy.com')
x.runs[0].font.size=Pt(10)
heading('PROFESSIONAL SUMMARY')
p('Cloud infrastructure engineer with experience designing, deploying, maintaining, and monitoring AWS, Azure, and GCP environments. Led Azure landing-zone and data-ingestion architecture for healthcare integrations and automated large-scale infrastructure provisioning with Terraform and Ansible. Hands-on experience with Amazon Bedrock agent deployment, SQL and PostgreSQL environments, database cluster operations, Kubernetes, and root cause analysis of production incidents.')
heading('TECHNICAL SKILLS')
for label,txt in [
 ('Cloud and Platforms','AWS, Microsoft Azure, GCP, Kubernetes (EKS, AKS, GKE), Docker, Helm, Linux'),
 ('Infrastructure as Code and Automation','Terraform, Ansible, Bash, PowerShell, Azure CLI'),
 ('AI and Databases','Generative AI, Amazon Bedrock, AI agents, SQL Server, PostgreSQL, Always On availability groups, database cluster administration'),
 ('Delivery and Observability','Git, GitHub Actions, Azure DevOps, Jenkins, Argo CD, Prometheus, Grafana, CloudWatch, Splunk'),
 ('Programming and Networking','Python, Java, Spring Boot, Go, VPC/VNet, DNS, IAM/RBAC, Private Endpoints')]:
 x=p(); x.add_run(label+': ').bold=True; x.add_run(txt)
heading('PROFESSIONAL EXPERIENCE')
job('Cloud Platform Engineer','Sunrun (Contract)','Jersey City, USA','Mar 2026 - Present')
bullet('Deployed an Amazon Bedrock-powered infrastructure-as-code agent to process iServe requests, populate Terraform code, and handle Ansible post-provisioning automation, connecting service requests with infrastructure configuration workflows.')
bullet('Refactored reusable Terraform modules to support end-to-end resource configuration through code, eliminating manual post-deployment changes and reducing infrastructure deployment time by 30%.')
bullet('Enhanced EKS monitoring and observability with Prometheus and Grafana to surface Kubernetes health and deployment signals, reducing incident-triage time by 20%.')
bullet('Automated post-deployment validation of service reachability, IAM permissions, pod health, and dependency endpoints, preventing closure of unresolved infrastructure issues.')
job('Cloud Infrastructure Engineer','Molina Healthcare (Contract)','California, USA','Sep 2024 - Mar 2026')
bullet('Led Azure landing-zone and data-ingestion architecture for Bright Health and ConnectiCare integrations, supporting transfer of 150M+ files through private connectivity, access controls, metadata validation, and monitoring.')
bullet('Provisioned and configured 700+ production Azure servers for QNXT in two months using Terraform and approximately 40 Ansible jobs across prerequisite, application setup, and F5 networking workflows; coordinated delivery with network teams.')
bullet('Deployed and managed SQL Server Always On availability groups and PostgreSQL environments supporting QNXT; troubleshot cluster nodes, performed node eviction and cluster reconfiguration, and corrected configuration issues.')
bullet('Diagnosed and repaired broken Ansible workflows for QNXT node configuration, restoring automated configuration steps used in infrastructure provisioning and maintenance.')
bullet('Supported 24x7 on-call coverage during QNXT Phases 3-4 deployments across 10 U.S. states, investigating infrastructure and application incidents and coordinating service recovery with engineering teams.')
bullet('Maintained an AI healthcare claims application on AKS, diagnosing rollout failures through Kubernetes events, pod health, and service endpoints to restore healthy deployments.')
bullet('Automated health, configuration, and tagging validation and remediation across 1,000+ Azure servers supporting Medicare, Medicaid, and Bright HealthCare projects using PowerShell and Azure CLI.')
job('Cloud Operations Engineer','GenPx Inc','Irving, Texas','Dec 2022 - Sep 2024')
bullet('Built reusable Terraform modules for GCP networking, IAM, compute, and GKE dependencies, standardizing infrastructure-as-code provisioning and reducing one-off environment configuration.')
bullet('Performed root cause analysis of production GKE incidents across pod deployments, service routing, IAM, and persistent storage, tracing workload failures to underlying cloud infrastructure.')
bullet('Automated vulnerability-remediation ticket creation by integrating Tenable findings with iServe, eliminating manual ticket creation for affected servers.')
job('Programmer Analyst','Cognizant Technology Solutions','Hyderabad, India','Dec 2021 - Aug 2022')
bullet('Developed Java/Spring Boot and Go microservices and REST APIs, improving API response times by 25% through backend performance tuning and production troubleshooting.')
bullet('Built Python tools for log analysis and API failure investigation, reducing diagnostic effort and supporting release testing and validation in Jenkins as part of the software development lifecycle (SDLC).')
heading('PROJECTS')
x=p(); x.add_run('Chess Decision Engine and Midgame Analysis: ').bold=True
x.add_run('Building an engine-driven platform to evaluate continuations, estimate win/draw/loss probabilities, and rank candidate lines by tactical complexity, risk, and positional strength.')
x=p(); x.add_run('Real Estate Analytics and Intelligence Platform: ').bold=True
x.add_run('Built a Hyderabad analytics platform combining property prices, RERA supply, infrastructure development, and GIS/zoning signals to forecast local price-growth trends.')
heading('EDUCATION')
x=p(); x.add_run('Master of Science in Computer Science | Stevens Institute of Technology').bold=True
p('Hoboken, NJ | Sep 2022 - May 2024 | GPA: 3.78/4 | Provost Master’s Scholarship Recipient')
x=p(); x.add_run('Bachelor of Technology in Electronics and Communication Engineering | Jain University').bold=True
p('Bengaluru, India | Aug 2017 - May 2021 | GPA: 7.8/10 | Minor in Computer Science')
heading('LEADERSHIP')
p('Vice President, JT Tech Club: Led technical events, hackathons, workshops, and student engineering initiatives.')
for root in [d.styles.element,d.element]:
 for border in root.xpath('.//w:pBdr'):
  border.getparent().remove(border)
d.save(out/'Sai_Ritwik_Reddy_Infrastructure_Cloud_Engineer.docx')
print(out/'Sai_Ritwik_Reddy_Infrastructure_Cloud_Engineer.docx')
