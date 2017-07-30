#!/bin/bash
latex rqc.tex
dvipdfm rqc.dvi
rm rqc.aux
rm rqc.log
rm rqc.dvi
open rqc.pdf
