from docx import Document
from copy import deepcopy
source=r'D:\Resume 2.0\Sai_Ritwik_reddy_core.docx'
out=r'C:\Users\rritw\ritwik-portfolio\output\documents\Sai_Ritwik_Reddy_Google_Cloud_Resume.docx'
d=Document(source)
updates={
21:('Cloud & Platform:',' Google Cloud Platform (GCP), Azure, AWS, Kubernetes (GKE/AKS/EKS), Linux, Docker, Helm'),
22:('Infrastructure & Delivery:',' Terraform, Ansible, Infrastructure as Code, Automated Provisioning, Cloud Migration, Technical Solution Delivery, Bash, PowerShell'),
23:('DevOps & Observability:',' CI/CD, Git, GitHub Actions, Azure DevOps, Jenkins, Argo CD, Prometheus, Grafana, CloudWatch, Splunk, Production Troubleshooting'),
24:('Programming:',' Python, Go, Java, Spring Boot, REST APIs, Microservices, Performance Tuning'),
25:('Networking & Security:',' GCP Networking, VPC/VNet, DNS, IAM/RBAC, Private Endpoints, Private Connectivity, F5 Networking Integration')}
for i,(label,body) in updates.items():
 p=d.paragraphs[i]
 labelfmt=deepcopy(p.runs[0]._r.rPr)
 bodyfmt=deepcopy(p.runs[1]._r.rPr) if len(p.runs)>1 else labelfmt
 for run in list(p.runs): p._p.remove(run._r)
 r=p.add_run(label)
 if labelfmt is not None: r._r.insert(0,labelfmt)
 r.bold=True
 r=p.add_run(body)
 if bodyfmt is not None: r._r.insert(0,bodyfmt)
 r.bold=False
d.save(out)
original=Document(source); check=Document(out)
assert len(original.paragraphs)==len(check.paragraphs)
assert all(a._p.xml==b._p.xml for i,(a,b) in enumerate(zip(original.paragraphs,check.paragraphs)) if i not in updates)
print('Verified: only the five skills paragraphs changed; all other paragraphs preserved exactly.')
print(out)
