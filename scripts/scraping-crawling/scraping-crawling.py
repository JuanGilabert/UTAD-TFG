"""
1.- Conceptos
Web-Scraping: raspado/extraccion de datos de una o varias paginas para un analisis posterior.
Web-crawling/spider: obtencion de hipernlaces o enlaces de las paginas para luego hacer web scrapng. Ejemplo: 
Web-parsing: siempre quen obtenemos datos de la web normalmente tenemos que extraer las pates que nos interesan.

Estas tecnicas nos permiten extraer datos de una web para analizarlos y realizar acciones como:
    - Alimentar bases de datos
    - Recopilar datos de varias paginas web con scraping y crawling
    - deteccion de cambios en sitios web.

2.- Arañas web o crawlers: Es un robot/programa que se encraga de inspeccionar
las paginas web de un servidor de forma metodica y automatizada.
Usos mas frecuentes:
    - Crear una copia de todas las paginas web viistadas.
    - Procesado posterior por un motor de busqueda que indexa las paginas.
    - Sistema de busquedas rapido.
Funcionamiento:
    - Las arañas visitan una lista de URLs.
    - Se descargan las paginas web.
    - Identifica los hiperenlaces de las paginas.
    - Los añade a la lista a visitar recurrentemente.
    - Luego descarga estas paginas nuevas.
    - Analiza sus enlaces.
    - Asi sucesivamente.
De ahi el nombre. Es como una tela de araña que muestra todas las conexiones
que se pueden llegar a encontrar.


Problemas al extraer datos de la web:
    - Cuanto mas valiosos sean los datos de una web mas va a intentar protegerlosfrente a scraping.
    - Muchas paginas tienen sistemas de deteccion de acciones no humanas. 
    Por ejemplo si yo entro en mil veces por segundo a una pagina no es muy dificil
    detectar que un humano no ha podido hacer eso. Se puede bloquear nuestra ip
    para acceder a la pagina y no se puedan extraer mas datos de ahi.
    - Miraratentamente los terminos legales de cualquier web/plataforma para considerar si hacer scraping o crawling.
"""
#
import urllib
data = urllib.request.urlopen('https://www.google.com').encode('utf-8')
for line in data: print(line.decode('utf-8'))