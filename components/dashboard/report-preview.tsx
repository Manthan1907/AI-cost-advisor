"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Copy, FileText, BarChart3, TrendingUp, DollarSign } from "lucide-react"
import { useMemo } from 'react'
import { toast } from 'sonner'

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  lastModified: Date | string | number // Allow string/number for safety during loading
  isActive: boolean
}

interface ReportPreviewProps {
  showReport: boolean
  session: ChatSession | null
}

export default function ReportPreview({ showReport, session }: ReportPreviewProps) {
  // Extract and format the report text from the last assistant message
  const reportText = useMemo(() => {
    if (!session) return ''
    const lastMessage = session.messages.findLast(msg => msg.role === 'assistant')
    // For now, we'll just return the content of the last assistant message.
    // In a real app, you might parse structured report data here.
    return lastMessage?.content || ''
  }, [session])

  const handleCopy = async () => {
    if (!reportText) return
    try {
      await navigator.clipboard.writeText(reportText)
      toast.success('Report copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy report:', err)
      toast.error('Failed to copy report.')
    }
  }

  const handleDownload = () => {
    if (!reportText) return
    const blob = new Blob([reportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-cost-report.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Determine which sections have data based on keywords
  const hasCostSummary = reportText.includes('**Cost Analysis:**')
  const hasROIProjection = reportText.includes('**Returns:**') || reportText.includes('payback period is approximately')
  const hasModelComparison = reportText.includes('**GPT-4:**') || reportText.includes('**Claude:**')
  const hasRecommendations = reportText.includes('**Recommendations:**')

  // Only show the report container if there's any content to display besides the default message
  const showReportContent = showReport && session && (hasCostSummary || hasROIProjection || hasModelComparison || hasRecommendations)

  if (!showReportContent) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-lavender to-lavender-dark rounded-2xl flex items-center justify-center mb-6">
          <FileText className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Complete your analysis to see the report</h3>
        <p className="text-muted-foreground max-w-sm leading-relaxed">
          Start a conversation to generate detailed cost analysis and recommendations
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 h-full overflow-auto">
      <div className="flex items-center justify-between sticky top-0 bg-cream/20 backdrop-blur-sm pb-4 border-b">
        <h2 className="text-xl font-bold">Analysis Report</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8" onClick={handleCopy} disabled={!reportText.trim()}>
            <Copy className="h-3 w-3 mr-2" />
            Copy
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-lavender to-lavender-dark hover:opacity-90 h-8" onClick={handleDownload} disabled={!reportText.trim()}>
            <Download className="h-3 w-3 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {hasCostSummary && (
          <Card className="border-lavender/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-lavender" />
                Cost Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Content derived from AI response */}
              {reportText.includes('**Cost Analysis:**') && (
                <div className="grid grid-cols-2 gap-4">
                  {/* Basic parsing example - would need more robust parsing for a real app */}
                  {reportText.split('**Cost Analysis:**')[1]?.split('**').filter(line => line.includes('-')).map((line, index) => {
                    const [key, value] = line.split(':')
                    if (!key || !value) return null
                    return (
                      <div key={index} className="text-center p-3 bg-cream/50 rounded-lg">
                        <div className="text-2xl font-bold text-lavender">{value.trim()}</div>
                        <div className="text-sm text-muted-foreground">{key.trim().replace('-', '')}</div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {hasROIProjection && (
          <Card className="border-lavender/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-lavender" />
                ROI Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Content derived from AI response */}
              {reportText.includes('**Returns:**') && (
                <div className="space-y-3">
                  {reportText.split('**Returns:**')[1]?.split('**').filter(line => line.includes(':')).map((line, index) => {
                    const [key, value] = line.split(':')
                    if (!key || !value) return null
                    return (
                      <div key={index} className="flex justify-between">
                        <span>{key.trim()}</span>
                        <span className={`font-semibold ${key.includes('ROI') ? 'text-lavender' : ''}`}>{value.trim()}</span>
                      </div>
                    )
                  })}
                </div>
              )}
              {reportText.includes('payback period is approximately') && (
                <div className="flex justify-between mt-3">
                  <span>Payback Period</span>
                  <span className="font-semibold">{reportText.split('payback period is approximately')[1]?.split('.')[0]?.trim()} months</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {hasModelComparison && (
          <Card className="border-lavender/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-lavender" />
                Model Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Content derived from AI response */}
              {reportText.includes('**GPT-4:**') && reportText.includes('**Claude:**') && (
                <div className="space-y-3">
                  {reportText.split('**GPT-4:**')[1]?.split('**').filter(line => line.trim()).map((line, index) => (
                    <div key={`gpt4-${index}`} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">GPT-4</span>
                        {reportText.includes('Recommendation: Use Claude') ? (
                          <span className="text-sm text-muted-foreground">Alternative</span>
                        ) : (
                          <span className="text-sm bg-lavender/10 text-lavender px-2 py-1 rounded">Recommended</span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{line.trim().replace('-', '')}</div>
                    </div>
                  ))}
                  {reportText.split('**Claude:**')[1]?.split('**').filter(line => line.trim()).map((line, index) => (
                    <div key={`claude-${index}`} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Claude</span>
                        {reportText.includes('Recommendation: Use Claude') ? (
                          <span className="text-sm bg-lavender/10 text-lavender px-2 py-1 rounded">Recommended</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Alternative</span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{line.trim().replace('-', '')}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {hasRecommendations && (
          <Card className="border-lavender/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Key Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Content derived from AI response */}
              {reportText.includes('**Recommendations:**') && (
                <ul className="space-y-2 text-sm">
                  {reportText.split('**Recommendations:**')[1]?.split('\n').filter(line => line.includes('. ')).map((line, index) => (
                    <li key={`rec-${index}`} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-lavender rounded-full mt-2 flex-shrink-0"></span>
                      {line.split('. ')[1]?.trim()}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
