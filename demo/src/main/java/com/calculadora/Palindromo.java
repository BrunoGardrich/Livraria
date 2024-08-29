package com.calculadora;

public class Palindromo {

    public static void main(String[] args) {

        int number = 123;

        String converter = Integer.toString(number);
 

        String inverterString = new StringBuilder(converter).reverse().toString();

        System.err.println(inverterString);

    }

}
