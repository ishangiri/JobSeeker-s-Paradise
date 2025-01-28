

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
    onClick : ()  => void ,
    onChangeInputValue : (e: React.ChangeEvent<HTMLInputElement>) => void ,
    onchangeInputLocationValue : (e: React.ChangeEvent<HTMLInputElement>) => void,
    searchValue : string,
    LocationValue : string,
}
 
const SearchBar = ({onClick, onChangeInputValue, searchValue, LocationValue, onchangeInputLocationValue} : SearchBarProps) => {
  return (
    <div className="flex items-center justify-center m-4">
    <div className="flex w-full  items-center justify-center space-x-2">
      <Input onChange={onChangeInputValue} value={searchValue} placeholder="Search Jobs by KeyWords..."  className="rounded-xl sm:w-[600px] "/>
      <Input onChange={onchangeInputLocationValue} value={LocationValue} placeholder=  " Location..."  className="rounded-xl sm:w-[200px]"/>

      <Button type="button" variant="secondary" onClick={onClick} className="bg-slate-700 hover:text-black text-white rounded-xl">Search</Button>
    </div>
    </div>
  )
}

export default SearchBar;