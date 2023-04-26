import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"
import { CategoriesService } from "../services/categories.service"

export const ListingCelebritiesContext = createContext()

export const ListingCelebritiesContextProvider = ({children}) => {
  const { query, push } = useRouter()

  const [propertiesModal, setPropertiesModal] = useState(false)
  const [title, setTitle] = useState('')
  const [selectedFilter, setSelectedFilter] = useState(query.category ? query.category.split(',') : [])
  const [categories, setCategories] = useState([])

  const onClickFilter = (id) => {
    if (!selectedFilter.find((filterId) => filterId === id)) {
      setSelectedFilter((prev) => [...prev, id])
    } else {
      setSelectedFilter((prev) => prev.filter((filterId) => filterId !== id))
    }
  }

  const onSubmitFilter = () => {
    push(`/listings?category=${selectedFilter.join(',')}`)
    setPropertiesModal(false)
  }

  const onClearFilter = () => {
    setSelectedFilter([])
    setTitle('')
    push('/listings')
    setPropertiesModal(false)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await CategoriesService.getCategories()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    if (query.generalCategory) {
      const generalCategory = categories.find(({ id }) => id.toString() === query.generalCategory)
      setSelectedFilter(generalCategory.subcategories.map(({ id }) => id.toString()))
      setTitle(generalCategory.name)
    } else if (query.category) {
      const foundedCategory = query.category.split(',').reduce((acc, cur) => {
        const foundedSubFilter = categories.find((filter) =>
          filter.subcategories.find((sub) => sub.id === +cur),
        )

        const foundedFilter = categories.find((filter) => filter.id === +cur)

        if (foundedFilter) {
          acc.push(foundedFilter)
        }

        if (foundedSubFilter && !acc.find((item) => item.name === foundedSubFilter.name)) {
          acc.push(foundedSubFilter)
        }
        return acc
      }, [])

      setSelectedFilter(query.category.split(','))

      setTitle(foundedCategory ? foundedCategory.map((category) => category.name).join(', ') : '')
    }
  }, [query])

  const contextValue = {
    propertiesModal,
    title,
    selectedFilter,
    categories,
    onClickFilter,
    onSubmitFilter,
    onClearFilter,
    setPropertiesModal
  }

  return (
    <ListingCelebritiesContext.Provider value={contextValue}>
      {children}
    </ListingCelebritiesContext.Provider>
  )
}