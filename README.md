# InvivoExtractor
A simple tool to decompose Invivo medical imaging .INV files into their component images. As the format isn't documented
(as far as I can tell) this tool is informed only by the available examples. If you have files you are
willing to share to please do so and we can incorperate anything learned into this tool.

## Requirements 
* Node JS 8.9 or higher
* ImageMagick 7 on your path

## Example workflow
* Recover Patient.inv from C:\ProgramData\ after running Anatomage's Single Case Viewer.
* Run this tool over Patient.inv
* Import the output png files into InVesalius 3.1 https://www.cti.gov.br/en/invesalius
* Produce STL files
