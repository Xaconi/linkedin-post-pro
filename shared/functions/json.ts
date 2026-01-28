export function extractJson(content: string): string {
    // Remove markdown code blocks if present
    const codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (codeBlockMatch) {
        return codeBlockMatch[1].trim()
    }
    return content.trim()
}