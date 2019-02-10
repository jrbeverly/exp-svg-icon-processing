from lxml import etree

tree = etree.parse('svg/test.svg')
root = tree.getroot()
toner_id = "095205615111"

results = root.xpath("//t[@id = '%s']" % toner_id)
if not results:
    raise Exception("Toner does not exist")

toner = results[0]
amount = toner.find("amount")
amount.text = str(int(amount.text) + 1)

writeTree = etree.ElementTree(root)
with open('./bin/filename.xml', 'wb') as f:
    f.write(etree.tostring(writeTree))