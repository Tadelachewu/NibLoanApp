"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import en from '@/locales/en.json';
import am from '@/locales/am.json';

type Locale = 'en' | 'am';

const translations = { en, am };

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocaleState] = useState<Locale>('en');

    useEffect(() => {
        const savedLocale = localStorage.getItem('locale') as Locale;
        if (savedLocale && (savedLocale === 'en' || savedLocale === 'am')) {
            setLocaleState(savedLocale);
        }
    }, []);
    
    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
    };
    
    const t = (key: string, params?: Record<string, string | number>): string => {
        const keys = key.split('.');
        let result = translations[locale] as any;
        for (const k of keys) {
            result = result?.[k];
            if (result === undefined) {
                // Fallback to English if translation not found
                let fallbackResult = translations.en as any;
                for (const fk of keys) {
                    fallbackResult = fallbackResult?.[fk];
                }
                if (fallbackResult === undefined) {
                    return key; // Return key if not found in English either
                }
                result = fallbackResult;
                break;
            }
        }
        
        if (typeof result === 'string' && params) {
            return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
                return acc.replace(`{${paramKey}}`, String(paramValue));
            }, result);
        }

        return result || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};
