export type RegistryComponent = {
  name: string
  preview: React.ReactNode
  command: string
  docs?: {
    description: string
    import: string
    example: string
    props: Array<{
      name: string
      type: string
      description: string
      default?: string
    }>
  }
}

export type Prop = {
  name: string
  type: string
  description: string
  default?: string
}

export type DocsSchema = {
  description: string
  import: string
  example: string
  props: Prop[]
}
