import { FileUpload } from "@/components/file-upload";
import {
  Brain,
  FileText,
  Shield,
  Download,
  Clock,
  UserCog,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced AI technology analyzes your medical reports with high accuracy and provides detailed insights.",
  },
  {
    icon: FileText,
    title: "Comprehensive Reports",
    description:
      "Get detailed breakdowns of test results, health issues, specialist recommendations, and medication guidance.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your medical data is processed securely and never stored, ensuring complete privacy and confidentiality.",
  },
  {
    icon: Download,
    title: "PDF Export",
    description:
      "Download your analysis results in a well-formatted PDF report for easy sharing with healthcare providers.",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description:
      "Receive detailed analysis within seconds, helping you understand your medical reports quickly.",
  },
  {
    icon: UserCog,
    title: "Specialist Guidance",
    description:
      "Get recommendations for medical specialists based on your report findings and health conditions.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mt-20 text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Medical Report Analyzer
          </h1>
          <p className="mt-3 text-xl text-gray-500 max-w-2xl mx-auto">
            Upload your medical report and get an instant AI-powered analysis
            that helps you understand your health status better.
          </p>
        </div>

        <div className="mt-12">
          <FileUpload />
        </div>

        {/* Features Grid */}
        <div className="py-16 border-t border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features for Better Health Understanding
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-2.5 mb-4">
                  <feature.icon className="h-full w-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Section */}
      </div>
    </main>
  );
}
