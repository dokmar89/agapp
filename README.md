# Prototyp průchodu ověřením věku

Prototyp v Next.js zaměřený na vícekrokové uživatelské rozhraní pro ověření věku.

**Stav:** Starší nebo souběžná varianta PassProve uchovaná jako reference; nejde o označení hlavní produkční verze.

## Co projekt obsahuje

- Kroky pro bankovní identitu, sken obličeje či dokladu, jiné zařízení a opakované ověření.
- Zobrazení výsledku ověření.
- Pomocné moduly API, monitoringu, oznámení a fronty.

## Technologie

Next.js, React, TypeScript, Tailwind CSS.

## Architektura a struktura

- `app/` — stránky Next.js
- `components/` — rozhraní ověřovacích kroků
- `lib/` — integrační a pomocné moduly
- `age-verification-page.tsx` — zdroj ověřovací stránky

## Lokální vývoj

Potřebujete Node.js a npm. V kořenové složce repozitáře spusťte:

```sh
npm install
npm run dev
```

Příkaz pro sestavení uvedený v projektu: `npm run build`.

Jde o příkazy deklarované v repozitáři, nikoli o potvrzení úspěšného sestavení. Instalace závislostí, sestavení ani napojení na živé služby nebyly při úpravě dokumentace spuštěny.

## Konfigurace a omezení

Názvy metod označují dostupné obrazovky, nikoli ověřené smluvní integrace nebo certifikaci. Před napojením služeb zkontrolujte pomocné moduly a úplnost závislostí. Používejte fiktivní testovací data.

## Co doplnit do dokumentace

Snímky obrazovky s fiktivními daty, opakovatelný postup ověření a přehled skutečně otestovaných integrací. Přihlašovací údaje a konfigurace konkrétního nasazení patří mimo Git.
