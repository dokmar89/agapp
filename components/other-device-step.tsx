import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

export function OtherDeviceStep({ onBack }: { onBack: () => void }) {
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!verificationComplete) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval)
            setVerificationComplete(true)
            return 100
          }
          return prevProgress + 10
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [verificationComplete])

  const qrCodeData = "https://example.com/verify?token=123456" // Replace with actual verification URL

  return (
    <div className="max-w-md mx-auto">
      <Button
        variant="ghost"
        className="mb-6 text-primary hover:text-primary-light"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Zpět na výběr metody
      </Button>
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Ověření na jiném zařízení</h2>
          <p className="text-gray-light mb-6">
            Naskenujte QR kód pomocí svého mobilního zařízení a dokončete proces ověření.
          </p>
          <div className="flex justify-center mb-6">
            <QRCodeSVG value={qrCodeData} size={200} />
          </div>
          {!verificationComplete ? (
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          ) : (
            <p className="text-center text-green-600 font-semibold">
              Ověření bylo úspěšně dokončeno na jiném zařízení.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

