package com.calculadora;

import java.util.StringTokenizer;

public class ContarFrase {
    public static void main(String[] args) {
        // Testar com alguns exemplos
        String frase = "Bruno é lindão ";

        StringTokenizer contarFrase = new StringTokenizer(frase);

        int contTokens = contarFrase.countTokens();


        System.err.println("Quantidade de palavras : " + contTokens);

        
    }

}