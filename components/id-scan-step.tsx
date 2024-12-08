import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Camera, CheckCircle, XCircle } from 'lucide-react'
import { VerificationResult } from './verification-result'

export function IDScanStep({ onBack }: { onBack: () => void }) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [isOCRReady, setIsOCRReady] = useState(false)
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null)
  const [verificationProgress, setVerificationProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleStartScan = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsScanning(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Simulate scanning process
      setTimeout(() => {
        setIsScanning(false)
        setScanComplete(true)
        setIsOCRReady(Math.random() > 0.3) // 70% chance of being OCR ready
      }, 3000)
    }
  }

  const handleVerify = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setVerificationProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setVerificationResult(Math.random() > 0.5) // 50% chance of successful verification
      }
    }, 500)
  }

  if (verificationResult !== null) {
    return <VerificationResult isVerified={verificationResult} />
  }

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
          <h2 className="text-2xl font-bold text-primary mb-4">Sken dokladu</h2>
          <p className="text-gray-light mb-6">
            Pro ověření věku prosím naskenujte nebo vyfoťte svůj doklad totožnosti. Ujistěte se, že jsou všechny informace čitelné.
          </p>
          <div className="relative aspect-[3/2] mb-4 bg-gray-100 rounded-lg overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <Camera className="w-12 h-12" />
              </div>
            )}
            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {scanComplete && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-50">
                {isOCRReady ? (
                  <CheckCircle className="w-16 h-16 text-white" />
                ) : (
                  <XCircle className="w-16 h-16 text-white" />
                )}
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
          />
          {!scanComplete && (
            <Button
              onClick={handleStartScan}
              disabled={isScanning}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              {isScanning ? 'Skenování...' : 'Naskenovat doklad'}
              <Camera className="ml-2 h-4 w-4" />
            </Button>
          )}
          {scanComplete && (
            <>
              <p className="mt-4 text-center font-semibold">
                {isOCRReady ? (
                  <span className="text-green-600">Doklad je připraven k ověření.</span>
                ) : (
                  <>
                    <span className="text-red-600">Doklad není vhodný pro OCR ověření. Zkuste to prosím znovu.</span>
                    <Button
                      onClick={handleStartScan}
                      className="mt-2 w-full bg-primary text-white hover:bg-primary/90"
                    >
                      Nahrát nový doklad
                    </Button>
                  </>
                )}
              </p>
              <Button
                onClick={handleVerify}
                disabled={!isOCRReady || verificationProgress > 0}
                className="w-full mt-4 bg-primary text-white hover:bg-primary/90"
              >
                {verificationProgress > 0 ? `Ověřování: ${verificationProgress}%` : 'Ověřit nyní'}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

