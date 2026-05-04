'use client';

import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { getExampleNumber, isValidPhoneNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';

interface PhoneInputWithFlagProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  className?: string;
}

function getPlaceholderForCountry(iso2: string): string {
  try {
    const phoneNumber = getExampleNumber(iso2.toUpperCase() as any, examples);
    if (phoneNumber) return phoneNumber.formatNational();
  } catch (_) {}
  return '';
}

export default function PhoneInputWithFlag({ value, onChange, className }: PhoneInputWithFlagProps) {
  const [countryCode, setCountryCode] = useState<string>('br');
  const [placeholder, setPlaceholder] = useState<string>(getPlaceholderForCountry('br'));

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_code) {
          const iso2 = data.country_code.toLowerCase();
          setCountryCode(iso2);
          setPlaceholder(getPlaceholderForCountry(iso2));
        }
      })
      .catch(() => {});
  }, []);

  const handleOnChange = (val: string, data: any) => {
    const iso2: string = data?.countryCode ?? countryCode;
    if (iso2 !== countryCode) {
      setCountryCode(iso2);
      setPlaceholder(getPlaceholderForCountry(iso2));
    }

    let isValid = false;
    try {
      isValid = val.length > 4 && isValidPhoneNumber('+' + val);
    } catch (_) {
      isValid = false;
    }

    onChange(val, isValid);
  };

  return (
    <div className={`phone-input-container ${className || ''}`}>
      <PhoneInput
        country={countryCode}
        value={value}
        onChange={handleOnChange}
        inputProps={{ name: 'phone', required: true, autoFocus: false }}
        containerClass="!w-full"
        specialLabel=""
        placeholder={placeholder}
        enableSearch={true}
        disableSearchIcon={false}
        autoFormat={true}
        preferredCountries={['br', 'pt', 'us']}
        masks={{ br: '(..) .....-....', ar: '... ..-....-....' }}
      />
    </div>
  );
}
