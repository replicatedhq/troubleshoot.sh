linkchecker --no-warnings --recursion-level=3  -v https://troubleshoot.sh/ | grep "Real URL"  | grep "https://troubleshoot.sh/.*/$" | awk '{print $3}'  | sort | uniq > troubleshoot.txt

mkdir pdf-source
while read p; do
  wkhtmltopdf -n $p pdf-source/`date +%s`.pdf
done <troubleshoot.txt

pdfunite pdf-source/* troubleshoot.pdf

rm -rf pdf-source
