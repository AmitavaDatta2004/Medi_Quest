"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Star,
  Pill,
  FlaskRound,
  Building,
  Clock,
  AlertTriangle,
  Sandwich,
  Thermometer,
  DollarSign,
  Repeat,
  MapPin,
} from "lucide-react"
import type { MedicineData } from "@/types/medicine"
import { motion, AnimatePresence } from "framer-motion"
import jsPDF from "jspdf"

export function MedicineDetails({ data }: { data: MedicineData }) {
  const [activeTab] = useState("overview")
  const [key, setKey] = useState(0)

  useEffect(() => {
    // Force re-render when data changes
    setKey((prevKey) => prevKey + 1)
  }, [data])

  const handleDownload = () => {
    const pdf = new jsPDF()
    let yPos = 20
    const lineHeight = 7
    const margin = 20
    const pageWidth = pdf.internal.pageSize.width

    // Helper functions
    const addTitle = (text: string) => {
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(16)
      pdf.text(text, margin, yPos)
      yPos += lineHeight * 1.5
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(12)
    }

    const addSection = (title: string) => {
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      yPos += lineHeight
      pdf.text(title, margin, yPos)
      yPos += lineHeight
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(12)
    }

    const addText = (text: string) => {
      const lines = pdf.splitTextToSize(text, pageWidth - margin * 2)
      lines.forEach((line: string) => {
        if (yPos > pdf.internal.pageSize.height - margin) {
          pdf.addPage()
          yPos = margin
        }
        pdf.text(line, margin, yPos)
        yPos += lineHeight
      })
    }

    const addList = (items: string[]) => {
      items.forEach((item) => {
        if (yPos > pdf.internal.pageSize.height - margin) {
          pdf.addPage()
          yPos = margin
        }
        pdf.text(`• ${item}`, margin + 5, yPos)
        yPos += lineHeight
      })
    }

    // Title and Basic Info
    addTitle(`${data.name} (${data.genericName})`)
    addText(`Manufacturer: ${data.manufacturer.name}, ${data.manufacturer.country}`)

    // Composition
    addSection("Composition")
    addText(`Form: ${data.composition.formulationType}`)
    addText("Active Ingredients:")
    addList(data.composition.activeIngredients)
    if (data.composition.inactiveIngredients.length > 0) {
      addText("Inactive Ingredients:")
      addList(data.composition.inactiveIngredients)
    }

    // Function
    addSection("Function")
    addText(`Primary Action: ${data.function.primaryAction}`)
    addText(`Mechanism: ${data.function.mechanismOfAction}`)
    addText(`Class: ${data.function.therapeuticClass}`)

    // Dosage
    addSection("Dosage Information")
    addText(`Adult Dose: ${data.dosage.standardDose.adult}`)
    addText(`Pediatric Dose: ${data.dosage.standardDose.pediatric}`)
    addText(`Elderly Dose: ${data.dosage.standardDose.elderly}`)
    addText(`Maximum Daily Dose: ${data.dosage.maximumDailyDose}`)
    addText(`Duration: ${data.dosage.durationOfTreatment}`)
    addText(`Timing: ${data.dosage.timingConsiderations}`)

    // Side Effects
    addSection("Side Effects")
    addText("Common Side Effects:")
    addList(data.sideEffects.common)
    addText("Serious Side Effects:")
    addList(data.sideEffects.serious)

    // Interactions
    addSection("Interactions")
    if (data.interactions.drugInteractions.length > 0) {
      addText("Drug Interactions:")
      addList(data.interactions.drugInteractions)
    }
    if (data.interactions.foodInteractions.length > 0) {
      addText("Food Interactions:")
      addList(data.interactions.foodInteractions)
    }

    // Storage
    addSection("Storage and Handling")
    addText(`Temperature: ${data.storage.temperature}`)
    addText(`Conditions: ${data.storage.specialConditions}`)
    addText(`Expiry: ${data.storage.expiryGuidelines}`)

    // Price and Rating
    addSection("Price Information")
    addText(`Retail Price: ${data.price.averageRetailPrice}`)
    addText(`Unit Price: ${data.price.unitPrice}`)
    addText(`Rating: ${data.rating.toFixed(1)}/5 (${data.reviewCount.toLocaleString()} reviews)`)

    // Alternatives
    if (data.substitutes.length > 0) {
      addSection("Alternative Medicines")
      data.substitutes.forEach((sub) => {
        addText(`${sub.name} (${sub.genericName})`)
        addText(`Price: ${sub.price}`)
        addText(`Notes: ${sub.comparisonNotes}`)
        yPos += lineHeight / 2
      })
    }

    // Nearby Pharmacies
    addSection("Nearby Pharmacies")
    addText(`Location: ${data.nearbyPharmacies.location}`)
    data.nearbyPharmacies.pharmacies.forEach((pharmacy, index) => {
      addText(`${index + 1}. ${pharmacy.name}`)
      addText(`   Address: ${pharmacy.address}`)
      addText(`   Contact: ${pharmacy.contact}`)
      yPos += lineHeight / 2
    })

    // Footer
    pdf.setFontSize(10)
    const today = new Date().toLocaleDateString()
    pdf.text(`Generated on ${today}`, margin, pdf.internal.pageSize.height - 10)

    // Save the PDF
    pdf.save(`${data.name}-details.pdf`)
  }

  if (!data || typeof data !== "object") {
    return (
      <div className="text-center p-4">
        <p>No medicine data available</p>
      </div>
    )
  }

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  }

  return (
    <motion.div
      key={key}
      className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div>
          <motion.h2
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {data.name}
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {data.genericName}
          </motion.p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="hover:bg-blue-100 transition-colors duration-300 shadow-sm"
          >
            <Download className="mr-2 h-5 w-5" />
            Download PDF
          </Button>
        </motion.div>
      </motion.div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-blue-100/50 p-1 rounded-lg">
          {["overview", "usage", "effects", "alternatives", "pricing", "pharmacies"].map((tab) => (
            <motion.div key={tab} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <TabsTrigger
                value={tab}
                className="capitalize data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all duration-300 rounded-md"
              >
                {tab}
              </TabsTrigger>
            </motion.div>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          {["overview", "usage", "effects", "alternatives", "pricing"].map((tab) => (
            <TabsContent key={tab} value={tab}>
            <motion.div
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-white/20 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700 flex items-center gap-2">
                    <motion.span variants={iconVariants} initial="hidden" animate="visible">
                        {tab === "overview" ? (
                        <Pill className="h-6 w-6" />
                        ) : tab === "usage" ? (
                        <Clock className="h-6 w-6" />
                        ) : tab === "effects" ? (
                        <AlertTriangle className="h-6 w-6" />
                        ) : tab === "alternatives" ? (
                        <Repeat className="h-6 w-6" />
                      ) : tab === "pricing" ? (
                        <DollarSign className="h-6 w-6" />
                      ) : (
                        <MapPin className="h-6 w-6" />
                      )}
                    </motion.span>
                      {tab === "overview"
                      ? "Medicine Overview"
                        : tab === "usage"
                        ? "Usage Information"
                          : tab === "effects"
                          ? "Effects & Side Effects"
                            : tab === "alternatives"
                            ? "Alternative Medicines"
                            : tab === "pricing"
                              ? "Pricing & Storage"
                              : "Nearby Pharmacies"}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {activeTab === "overview"
                      ? "Basic information and composition"
                      : tab === "usage"
                        ? "How to take this medicine"
                          : tab === "effects"
                          ? "Benefits and potential risks"
                            : tab === "alternatives"
                            ? "Similar medicines and substitutes"
                            : tab === "pricing"
                              ? "Cost information and storage requirements"
                              : "Pharmacies with availability information"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {tab === "overview" && (
                    <>
                      <motion.div
                        className="bg-blue-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h4 className="font-semibold text-lg mb-3 text-blue-700 flex items-center gap-2">
                            <FlaskRound className="h-5 w-5" />
                          Composition
                        </h4>
                        <div className="space-y-2">
                          <p>
                            <strong>Form:</strong> {data.composition.formulationType}
                          </p>
                          <div>
                            <strong>Active Ingredients:</strong>
                            <ul className="list-disc pl-5 mt-1">
                              {data.composition.activeIngredients.map((ingredient, i) => (
                                <li key={i}>{ingredient}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Inactive Ingredients:</strong>
                            <ul className="list-disc pl-5 mt-1">
                              {data.composition.inactiveIngredients.map((ingredient, i) => (
                                <li key={i}>{ingredient}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        className="bg-purple-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h4 className="font-semibold text-lg mb-3 text-purple-700 flex items-center gap-2">
                          <Pill className="h-5 w-5" />
                          Function
                        </h4>
                        <div className="space-y-2">
                          <p>
                            <strong>Primary Action:</strong> {data.function.primaryAction}
                          </p>
                          <p>
                            <strong>Mechanism:</strong> {data.function.mechanismOfAction}
                          </p>
                          <p>
                            <strong>Class:</strong> {data.function.therapeuticClass}
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        className="bg-green-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h4 className="font-semibold text-lg mb-3 text-green-700 flex items-center gap-2">
                          <Building className="h-5 w-5" />
                          Manufacturer
                        </h4>
                        <p>
                          <strong>Company:</strong> {data.manufacturer.name}
                        </p>
                        <p>
                          <strong>Country:</strong> {data.manufacturer.country}
                        </p>
                      </motion.div>
                    </>
                  )}
                    {tab === "usage" && (
                    <>
                      <motion.div
                        className="bg-yellow-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h4 className="font-semibold text-lg mb-3 text-yellow-700 flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          Dosage Information
                        </h4>
                        <div className="space-y-2">
                          <div>
                            <strong>Standard Dosage:</strong>
                            <ul className="list-disc pl-5 mt-1">
                              <li>
                                <strong>Adults:</strong> {data.dosage.standardDose.adult}
                              </li>
                              <li>
                                <strong>Children:</strong> {data.dosage.standardDose.pediatric}
                              </li>
                              <li>
                                <strong>Elderly:</strong> {data.dosage.standardDose.elderly}
                              </li>
                            </ul>
                          </div>
                          <p>
                            <strong>Maximum Daily Dose:</strong> {data.dosage.maximumDailyDose}
                          </p>
                          <p>
                            <strong>Duration:</strong> {data.dosage.durationOfTreatment}
                          </p>
                          <p>
                            <strong>Timing:</strong> {data.dosage.timingConsiderations}
                          </p>
                          <p>
                            <strong>Missed Dose:</strong> {data.dosage.missedDose}
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        className="bg-indigo-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h4 className="font-semibold text-lg mb-3 text-indigo-700 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Instructions
                        </h4>
                        <div className="space-y-2">
                          <p>{data.instructions.generalGuidelines}</p>
                          <div>
                            <strong>Precautions:</strong>
                            <p className="mt-1">{data.instructions.specialPrecautions}</p>
                          </div>
                          <div>
                            <strong>Not Recommended For:</strong>
                            <ul className="list-disc pl-5 mt-1">
                              {data.instructions.contraindicationGroups.map((group, i) => (
                                <li key={i}>{group}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                    {tab === "effects" && (
                    <>
                      <motion.div
                        className="bg-green-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h4 className="font-semibold text-lg mb-3 text-green-700 flex items-center gap-2">
                          <Pill className="h-5 w-5" />
                          Disease Treatment
                        </h4>
                        <ul className="list-disc pl-5">
                          {data.diseases.map((disease, i) => (
                            <li key={i}>{disease}</li>
                          ))}
                        </ul>
                      </motion.div>
                      <motion.div
                        className="bg-red-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h4 className="font-semibold text-lg mb-3 text-red-700 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Side Effects
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <strong>Common Side Effects:</strong>
                            <ul className="list-disc pl-5 mt-1">
                              {data.sideEffects.common.map((effect, i) => (
                                <li key={i}>{effect}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Uncommon Side Effects:</strong>
                            <ul className="list-disc pl-5 mt-1">
                              {data.sideEffects.uncommon.map((effect, i) => (
                                <li key={i}>{effect}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Serious Side Effects:</strong>
                            <ul className="list-disc pl-5 mt-1 text-red-600">
                              {data.sideEffects.serious.map((effect, i) => (
                                <li key={i}>{effect}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        className="bg-orange-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h4 className="font-semibold text-lg mb-3 text-orange-700 flex items-center gap-2">
                          <Sandwich className="h-5 w-5" />
                          Interactions
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <strong>Drug Interactions:</strong>
                            <ul className="list-disc pl-5 mt-1">
                              {data.interactions.drugInteractions.map((interaction, i) => (
                                <li key={i}>{interaction}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Food Interactions:</strong>
                            <ul className="list-disc pl-5 mt-1">
                              {data.interactions.foodInteractions.map((interaction, i) => (
                                <li key={i}>{interaction}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Medical Conditions:</strong>
                            <ul className="list-disc pl-5 mt-1">
                              {data.interactions.conditions.map((condition, i) => (
                                <li key={i}>{condition}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                    {tab === "alternatives" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.substitutes.length > 0 ? (
                        data.substitutes.map((substitute, index) => (
                          <motion.div
                            key={index}
                            className="p-4 border rounded-lg bg-blue-50 hover:shadow-md transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                          >
                            <h4 className="font-semibold text-blue-700">{substitute.name}</h4>
                            <p className="text-sm text-gray-600">{substitute.genericName}</p>
                            <p className="text-sm mt-1 font-medium">{substitute.price}</p>
                            <p className="text-sm mt-2 text-gray-700">{substitute.comparisonNotes}</p>
                          </motion.div>
                        ))
                      ) : (
                        <p className="col-span-2 text-center text-gray-500">No alternative medicines available</p>
                      )}
                    </div>
                  )}
                    {tab === "pricing" && (
                    <>
                      <motion.div
                        className="bg-green-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h4 className="font-semibold text-lg mb-3 text-green-700 flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Price Information
                        </h4>
                        <p>
                          <strong>Retail Price:</strong> {data.price.averageRetailPrice}
                        </p>
                        <p>
                          <strong>Unit Price:</strong> {data.price.unitPrice}
                        </p>
                      </motion.div>
                      <motion.div
                        className="bg-blue-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h4 className="font-semibold text-lg mb-3 text-blue-700 flex items-center gap-2">
                          <Thermometer className="h-5 w-5" />
                          Storage Requirements
                        </h4>
                        <p>
                          <strong>Temperature:</strong> {data.storage.temperature}
                        </p>
                        <p>
                          <strong>Conditions:</strong> {data.storage.specialConditions}
                        </p>
                        <p>
                          <strong>Expiry:</strong> {data.storage.expiryGuidelines}
                        </p>
                      </motion.div>
                      <motion.div
                        className="bg-yellow-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h4 className="font-semibold text-lg mb-3 text-yellow-700 flex items-center gap-2">
                          <Star className="h-5 w-5" />
                          User Ratings
                        </h4>
                        <div className="flex items-center">
                          <Star className="h-6 w-6 text-yellow-400 fill-current" />
                          <span className="ml-2 text-lg font-semibold">{data.rating.toFixed(1)} / 5</span>
                          <span className="ml-4 text-gray-600">({data.reviewCount.toLocaleString()} reviews)</span>
                        </div>
                      </motion.div>
                    </>
                  )}
                  {tab === "pharmacies" && (
                    <motion.div
                      className="bg-blue-50 p-4 rounded-lg hover:shadow-md transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="font-semibold text-lg mb-3 text-blue-700 flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Nearby Pharmacies
                      </h4>
                      <p className="mb-4">
                        <strong>Location:</strong> {data.nearbyPharmacies.location}
                      </p>
                      <div className="space-y-4">
                        {data.nearbyPharmacies.pharmacies.map((pharmacy, index) => (
                          <motion.div
                            key={index}
                            className="p-3 bg-white rounded-lg shadow-sm"
                            whileHover={{ scale: 1.02 }}
                          >
                            <h5 className="font-semibold text-blue-600">{pharmacy.name}</h5>
                            <p className="text-sm text-gray-600">{pharmacy.address}</p>
                            <p className="text-sm text-gray-600">{pharmacy.contact}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
            ))}
        </AnimatePresence>
              
      </Tabs>
    </motion.div>
  )
}

