import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Phone, Mail, Apple, Chrome } from 'lucide-react'

export function VerificationResult({ isVerified }: { isVerified: boolean }) {
  const [saveResult, setSaveResult] = useState(false)
  const [showSaveOptions, setShowSaveOptions] = useState(false)
  const [selectedSaveMethod, setSelectedSaveMethod] = useState<string | null>(null)
  const [phoneOrEmail, setPhoneOrEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [paired, setPaired] = useState(false)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (!isVerified && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown, isVerified])

  const handleSaveResultChange = (checked: boolean) => {
    setSaveResult(checked)
    setShowSaveOptions(checked)
  }

  const handleSaveMethodSelect = (method: string) => {
    setSelectedSaveMethod(method)
  }

  const handleSendCode = () => {
    // Simulate sending verification code
    setCodeSent(true)
  }

  const handlePair = () => {
    // Simulate pairing process
    setPaired(true)
  }

  const handleFinish = () => {
    // Simulate finishing the process and returning to e-shop
    console.log("Finishing verification process and returning to e-shop")
  }

  if (!isVerified) {
    return (
      <Card className="max-w-md mx-auto bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-4">Nepodařilo se ověřit váš věk</h2>
            <p className="text-gray-light mb-6 text-center">
              Zkuste to, až vám bude 18, do té doby nashledanou.
            </p>
            <p className="text-primary font-semibold">
              Přesměrování za {countdown} sekund...
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto bg-white shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-4">Věk byl ověřen</h2>
          <p className="text-gray-light mb-6 text-center">
            Děkujeme za trpělivost. Věděli jste, že napříč eshopy s naším doplňkem můžete příště ověření přeskočit? Stačí si výsledek uložit.
          </p>
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="saveResult"
              checked={saveResult}
              onCheckedChange={handleSaveResultChange}
            />
            <Label htmlFor="saveResult">Uložit výsledek</Label>
          </div>
          {showSaveOptions && (
            <div className="w-full space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSaveMethodSelect('phone')}
              >
                <Phone className="mr-2 h-4 w-4" /> Telefon
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSaveMethodSelect('email')}
              >
                <Mail className="mr-2 h-4 w-4" /> Email
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSaveMethodSelect('apple')}
              >
                <Apple className="mr-2 h-4 w-4" /> Propojit AppleID
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSaveMethodSelect('google')}
              >
                <Chrome className="mr-2 h-4 w-4" /> Propojit Google účet
              </Button>
            </div>
          )}
          {(selectedSaveMethod === 'phone' || selectedSaveMethod === 'email') && (
            <div className="w-full mt-4 space-y-4">
              <Input
                type={selectedSaveMethod === 'phone' ? 'tel' : 'email'}
                placeholder={selectedSaveMethod === 'phone' ? 'Zadejte telefonní číslo' : 'Zadejte email'}
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
              />
              <Button
                className="w-full"
                onClick={handleSendCode}
                disabled={!phoneOrEmail || codeSent}
              >
                {codeSent ? 'Ověřovací kód byl odeslán' : 'Odeslat ověřovací kód'}
              </Button>
              {codeSent && (
                <>
                  <Input
                    type="text"
                    placeholder="Zadejte ověřovací kód"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    onClick={handlePair}
                    disabled={!verificationCode || paired}
                  >
                    {paired ? 'Spárováno' : 'Spárovat'}
                  </Button>
                </>
              )}
            </div>
          )}
          {(selectedSaveMethod === 'apple' || selectedSaveMethod === 'google') && (
            <p className="mt-4 text-center text-gray-light">
              Klikněte pro přihlášení a propojení s vaším {selectedSaveMethod === 'apple' ? 'Apple' : 'Google'} účtem.
            </p>
          )}
          {paired && (
            <p className="mt-4 text-center text-green-600 font-semibold">
              Děkujeme, váš účet byl úspěšně spárován.
            </p>
          )}
        </div>
        <Button
          className="w-full mt-6 bg-primary text-white hover:bg-primary/90"
          onClick={handleFinish}
        >
          Dokončit nákup
        </Button>
      </CardContent>
    </Card>
  )
}

