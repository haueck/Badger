<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="text"/>

  <xsl:template match="/">
    <xsl:text>[</xsl:text>
    <xsl:apply-templates/>
    <xsl:text>""]</xsl:text>
  </xsl:template>

  <xsl:template match="*">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="text()">
    <xsl:text>"</xsl:text>
    <xsl:value-of select="normalize-space(.)"/>
    <xsl:text>",</xsl:text>
  </xsl:template>

  <xsl:template match="@*"/>
</xsl:stylesheet>
