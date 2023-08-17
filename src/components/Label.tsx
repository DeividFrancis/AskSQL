import { ComponentProps } from "react"

type LabelProps = ComponentProps<"label">
export function Label(props: LabelProps) {
  return <label className="text-white font-light" {...props}/>
}