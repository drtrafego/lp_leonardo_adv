'use client';

import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { getExampleNumber, getCountryCallingCode, isValidPhoneNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';

interface PhoneInputWithFlagProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  className?: string;
  placeholder?: string;
}

export default function PhoneInputWithFlag({ value, onChange, className, placeholder }: PhoneInputWithFlagProps) {
  const [countryCode, setCountryCode] = useState<string>('br');
  const [dynamicPlaceholder, setDynamicPlaceholder] = useState<string>(placeholder || '(11) 99999-9999');

  const updatePlaceholder = (iso2: string) => {
    if (placeholder) return;
    try {
      if (!iso2) return;
      const phoneNumber = getExampleNumber(iso2.toUpperCase() as any, examples);
      if (phoneNumber) {
        setDynamicPlaceholder(phoneNumber.formatNational());
      } else {
        setDynamicPlaceholder('DDD + WhatsApp');
      }
    } catch (e) {
      setDynamicPlaceholder('DDD + WhatsApp');
    }
  };

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_code) {
          const code = data.country_code.toLowerCase();
          setCountryCode(code);
          updatePlaceholder(code);
        }
      })
      .catch(() => {});
  }, []);

  const handleOnChange = (val: string, data: any) => {
    let phoneValue = val;
    if (data && data.dialCode) {
      if (val && !val.startsWith(data.dialCode)) {
        phoneValue = data.dialCode + val;
      }
    }

    if (data && data.countryCode && data.countryCode !== countryCode) {
      setCountryCode(data.countryCode);
      updatePlaceholder(data.countryCode);
    }

    let isValid = false;
    try {
      if (phoneValue) {
        isValid = isValidPhoneNumber('+' + phoneValue);
      }
    } catch (e) {
      if (data && data.format) {
        const digitsOnly = phoneValue.replace(/\D/g, '');
        const ddiLength = data.dialCode ? data.dialCode.length : 0;
        const numberLength = digitsOnly.length - ddiLength;
        isValid = numberLength >= 10;
      } else {
        isValid = phoneValue.length >= 10;
      }
    }

    onChange(phoneValue, isValid);
  };

  let displayValue = value;
  try {
    if (countryCode && value) {
      const dialCode = getCountryCallingCode(countryCode.toUpperCase() as any);
      if (value.startsWith(dialCode)) {
        displayValue = value.substring(dialCode.length);
      }
    }
  } catch (e) {
    // Ignore invalid country code errors
  }

  return (
    <div className={`phone-input-container ${className || ''}`}>
      <PhoneInput
        country={countryCode}
        value={displayValue}
        onChange={handleOnChange}
        inputProps={{
          name: 'phone',
          required: true,
          autoFocus: false,
        }}
        containerClass="!w-full"
        specialLabel=""
        placeholder={dynamicPlaceholder}
        enableSearch={true}
        disableSearchIcon={false}
        autoFormat={true}
        preferredCountries={['br', 'us', 'pt']}
        disableCountryCode={true}
        disableCountryGuess={true}
        preserveOrder={['onlyCountries', 'preferredCountries']}
        masks={{ br: '(..) .....-....', ar: '... ..-....-....' }}
      />
    </div>
  );
}
