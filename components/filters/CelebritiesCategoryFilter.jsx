import { useContext } from 'react'
import cn from 'classnames'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import { useRouter } from 'next/router'
import { ListingCelebritiesContext } from '../../context/listingCelebritiesContext'

const isActiveSubcategory = (selectedFilters, id) =>
  selectedFilters.find((filter) => filter === id.toString())

const CelebritiesCategoryFilter = () => {
  const { query } = useRouter()

  const {
    propertiesModal,
    title,
    onClickFilter,
    onSubmitFilter,
    onClearFilter,
    selectedFilter,
    setPropertiesModal,
    categories: filters
  } = useContext(ListingCelebritiesContext)

  return (
    <>
      <div className='flex flex-wrap items-center justify-between'>
        <div className='flex flex-wrap items-center'>
          <div className='my-1 mr-2.5'>
            <button
              className='group dropdown-toggle dark:border-jacarta-600 dark:bg-jacarta-700 group dark:hover:bg-accent hover:bg-accent border-jacarta-100 font-display text-jacarta-700 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white'
              onClick={() => setPropertiesModal(true)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
                className='fill-jacarta-700 dark:fill-jacarta-100 mr-1 h-4 w-4 transition-colors group-hover:fill-white'>
                <path fill='none' d='M0 0h24v24H0z'></path>
                <path d='M6.17 18a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2v-2h4.17zm6-7a3.001 3.001 0 0 1 5.66 0H22v2h-4.17a3.001 3.001 0 0 1-5.66 0H2v-2h10.17zm-6-7a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2V4h4.17z'></path>
              </svg>
              <span className='-mb-1'>Filter Celebrities by: {title}</span>
            </button>

            <div
              className={propertiesModal ? 'modal fade show block' : 'modal fade'}
              id='propertiesModal'>
              <div className='modal-dialog max-w-md'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='propertiesModalLabel'>
                      Properties
                    </h5>
                    <button
                      type='button'
                      className='btn-close'
                      onClick={() => setPropertiesModal(false)}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='24'
                        height='24'
                        className='fill-jacarta-700 h-6 w-6 dark:fill-white'>
                        <path fill='none' d='M0 0h24v24H0z'></path>
                        <path d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z'></path>
                      </svg>
                    </button>
                  </div>

                  <div className='modal-body'>
                    <div className='accordion' id='accordionProps'>
                      <div className='accordion-item dark:border-jacarta-600 border-jacarta-100 border-b'>
                        <Accordion>
                          {filters.map((item) => {
                            const { id: categoryId, name, subcategories } = item
                            return (
                              <AccordionItem key={categoryId}>
                                <AccordionItemHeading>
                                  <AccordionItemButton>
                                    <h2 className='accordion-header' id='prop-heading-1'>
                                      <button
                                        className={cn(
                                          'accordion-button collapsed dark:bg-jacarta-700 font-display text-jacarta-700 relative flex w-full items-center justify-between bg-white px-6 py-5 dark:text-white',
                                          {
                                            ['!text-accent']:
                                              query.category === categoryId.toString() ||
                                              selectedFilter.find((filter) =>
                                                subcategories.find(
                                                  (sub) => sub.id.toString() === filter,
                                                ),
                                              ),
                                          },
                                        )}>
                                        <span>{name}</span>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          viewBox='0 0 24 24'
                                          width='24'
                                          height='24'
                                          className='accordion-arrow fill-jacarta-700 h-4 w-4 transition-transform dark:fill-white'>
                                          <path fill='none' d='M0 0h24v24H0z'></path>
                                          <path d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z'></path>
                                        </svg>
                                      </button>
                                    </h2>
                                  </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                  <div
                                    id='prop-background'
                                    className='scrollbar-custom accordion-collapse max-h-56 overflow-auto'>
                                    {subcategories.map((property) => {
                                      const { id, name } = property
                                      return (
                                        <div className='accordion-body px-2 pb-4' key={id}>
                                          <div className='flex flex-col'>
                                            <button
                                              onClick={() =>
                                                onClickFilter(id.toString(), categoryId.toString())
                                              }
                                              className={cn(
                                                'dark:hover:bg-jacarta-600 dark:text-jacarta-200 hover:bg-jacarta-50 flex items-center justify-between rounded-xl px-4 py-2',
                                                {
                                                  ['dark:bg-jacarta-600 bg-jacarta-50']:
                                                    isActiveSubcategory(selectedFilter, id),
                                                },
                                              )}>
                                              <span>{name}</span>
                                              {isActiveSubcategory(selectedFilter, id) && (
                                                <svg
                                                  xmlns='http://www.w3.org/2000/svg'
                                                  viewBox='0 0 24 24'
                                                  width='24'
                                                  height='24'
                                                  className='fill-accent mb-[3px] h-4 w-4'>
                                                  <path fill='none' d='M0 0h24v24H0z'></path>
                                                  <path d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z'></path>
                                                </svg>
                                              )}
                                            </button>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </AccordionItemPanel>
                              </AccordionItem>
                            )
                          })}
                        </Accordion>
                      </div>
                    </div>
                  </div>

                  <div className='modal-footer'>
                    <div className='flex items-center justify-center space-x-4'>
                      <button
                        type='button'
                        onClick={onClearFilter}
                        className='text-accent shadow-white-volume hover:bg-accent-dark hover:shadow-accent-volume w-36 rounded-full bg-white py-3 px-8 text-center font-semibold transition-all hover:text-white'>
                        Clear All
                      </button>
                      <button
                        type='button'
                        onClick={() => onSubmitFilter()}
                        className='bg-accent shadow-accent-volume hover:bg-accent-dark w-36 rounded-full py-3 px-8 text-center font-semibold text-white transition-all'>
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CelebritiesCategoryFilter
