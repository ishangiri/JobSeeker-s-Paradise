

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
    onClick : ()  => void ,
    onChangeInputValue : (e: React.ChangeEvent<HTMLInputElement>) => void ,
    value : any,
}
 
const SearchBar = ({onClick, onChangeInputValue, value} : SearchBarProps) => {
  return (
    <div className="flex items-center justify-center m-4">
    <div className="flex w-full  items-center justify-center space-x-2">
      <Input onChange={onChangeInputValue} value={value} placeholder="Search Jobs..."  className="rounded-xl w-[800px]"/>
      <Button type="button" variant="secondary" onClick={onClick} className="bg-slate-700 hover:text-black text-white rounded-xl">Search</Button>
    </div>
    </div>
  )
}

export default SearchBar;