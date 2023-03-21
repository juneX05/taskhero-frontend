<template>

  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col mt-2">
      <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction
            </th>
            <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th class="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
              Status
            </th>
            <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
          <tr class="bg-white">
            <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex"><a href="#" class="group inline-flex space-x-2 truncate text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" aria-hidden="true"
                     class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" style="">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p class="text-gray-500 truncate group-hover:text-gray-900">Sales to Eddie June</p></a></div>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <span class="text-gray-900 font-medium">20,000</span>
              TZS
            </td>
            <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
              <span
                  class="bg-red-100 text-red-800 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                new
              </span>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <time datetime="2020-07-11">July 11, 2020</time>
            </td>
          </tr>
          <tr class="bg-white">
            <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex"><a href="#" class="group inline-flex space-x-2 truncate text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" aria-hidden="true"
                     class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" style="">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p class="text-gray-500 truncate group-hover:text-gray-900">Sales to Tim Kelvin</p></a></div>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <span class="text-gray-900 font-medium">$20,000</span>
              USD
            </td>
            <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
              <span
                  class="bg-green-100 text-green-800 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                calculated
              </span>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <time datetime="2020-07-11">July 11, 2020</time>
            </td>
          </tr>
          <tr class="bg-white">
            <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex"><a href="#" class="group inline-flex space-x-2 truncate text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" aria-hidden="true"
                     class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" style="">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p class="text-gray-500 truncate group-hover:text-gray-900">Sales to Baraka John</p></a></div>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <span class="text-gray-900 font-medium">$20,000</span>
              USD
            </td>
            <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
              <span
                  class="bg-green-100 text-green-800 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                calculated
              </span>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <time datetime="2020-07-11">July 11, 2020</time>
            </td>
          </tr>
          <tr class="bg-white">
            <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex"><a href="#" class="group inline-flex space-x-2 truncate text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" aria-hidden="true"
                     class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" style="">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p class="text-gray-500 truncate group-hover:text-gray-900">Sales to Patrick Paul</p></a></div>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <span class="text-gray-900 font-medium">$20,000</span>
              USD
            </td>
            <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
              <span
                  class="bg-green-100 text-green-800 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                calculated
              </span>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <time datetime="2020-07-11">July 11, 2020</time>
            </td>
          </tr>
          <tr class="bg-white">
            <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex"><a href="#" class="group inline-flex space-x-2 truncate text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" aria-hidden="true"
                     class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" style="">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p class="text-gray-500 truncate group-hover:text-gray-900">Sales to June Hansen</p></a></div>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <span class="text-gray-900 font-medium">$20,000</span>
              USD
            </td>
            <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
              <span
                  class="bg-red-100 text-red-800 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                new
              </span>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <time datetime="2020-07-11">July 11, 2020</time>
            </td>
          </tr>
          <tr class="bg-white">
            <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex"><a href="#" class="group inline-flex space-x-2 truncate text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" aria-hidden="true"
                     class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" style="">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p class="text-gray-500 truncate group-hover:text-gray-900">Sales to Molly Sanders</p></a></div>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <span class="text-gray-900 font-medium">$20,000</span>
              USD
            </td>
            <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
              <span
                  class="bg-red-100 text-red-800 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                new
              </span>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <time datetime="2020-07-11">July 11, 2020</time>
            </td>
          </tr>
          <tr class="bg-white">
            <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex"><a href="#" class="group inline-flex space-x-2 truncate text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                     stroke="currentColor" aria-hidden="true"
                     class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" style="">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p class="text-gray-500 truncate group-hover:text-gray-900">Sales to Peter Pan</p></a></div>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <span class="text-gray-900 font-medium">$20,000</span>
              USD
            </td>
            <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
              <span
                  class="bg-red-100 text-red-800 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                new
              </span>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
              <time datetime="2020-07-11">July 11, 2020</time>
            </td>
          </tr>
          </tbody>
        </table>
        <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
             aria-label="Pagination">
          <div class="hidden sm:block">
            <p class="text-sm text-gray-700"> Showing
              <span class="font-medium">1</span>
              to
              <span class="font-medium">10</span>
              of
              <span class="font-medium">20</span>
              results
            </p>
          </div>
          <div class="flex-1 flex justify-between sm:justify-end"><a href="#"
                                                                     class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous </a><a href="#"
                            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next </a></div>
        </nav>
      </div>
    </div>
  </div>

  <div class="shadow sm:hidden">
    <ul role="list" class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
      <li><a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
        <span class="flex items-center space-x-4">
          <span class="flex-1 flex space-x-2 truncate">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                 stroke="currentColor" aria-hidden="true" class="flex-shrink-0 h-5 w-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="flex flex-col text-gray-500 text-sm truncate">
              <span class="truncate">Sales to Eddie June</span>
              <span>
                <span class="text-gray-900 font-medium">20,000</span>
                TZS
              </span>
              <time datetime="2020-07-11">July 11, 2020</time>
            </span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
               class="flex-shrink-0 h-5 w-5 text-gray-400">
            <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"></path>
          </svg>
        </span>
      </a></li>
      <li><a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
        <span class="flex items-center space-x-4">
          <span class="flex-1 flex space-x-2 truncate">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                 stroke="currentColor" aria-hidden="true" class="flex-shrink-0 h-5 w-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="flex flex-col text-gray-500 text-sm truncate">
              <span class="truncate">Sales to Tim Kelvin</span>
              <span>
                <span class="text-gray-900 font-medium">$20,000</span>
                USD
              </span>
              <time datetime="2020-07-11">July 11, 2020</time>
            </span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
               class="flex-shrink-0 h-5 w-5 text-gray-400">
            <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"></path>
          </svg>
        </span>
      </a></li>
      <li><a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
        <span class="flex items-center space-x-4">
          <span class="flex-1 flex space-x-2 truncate">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                 stroke="currentColor" aria-hidden="true" class="flex-shrink-0 h-5 w-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="flex flex-col text-gray-500 text-sm truncate">
              <span class="truncate">Sales to Baraka John</span>
              <span>
                <span class="text-gray-900 font-medium">$20,000</span>
                USD
              </span>
              <time datetime="2020-07-11">July 11, 2020</time>
            </span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
               class="flex-shrink-0 h-5 w-5 text-gray-400">
            <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"></path>
          </svg>
        </span>
      </a></li>
      <li><a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
        <span class="flex items-center space-x-4">
          <span class="flex-1 flex space-x-2 truncate">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                 stroke="currentColor" aria-hidden="true" class="flex-shrink-0 h-5 w-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="flex flex-col text-gray-500 text-sm truncate">
              <span class="truncate">Sales to Patrick Paul</span>
              <span>
                <span class="text-gray-900 font-medium">$20,000</span>
                USD
              </span>
              <time datetime="2020-07-11">July 11, 2020</time>
            </span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
               class="flex-shrink-0 h-5 w-5 text-gray-400">
            <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"></path>
          </svg>
        </span>
      </a></li>
      <li><a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
        <span class="flex items-center space-x-4">
          <span class="flex-1 flex space-x-2 truncate">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                 stroke="currentColor" aria-hidden="true" class="flex-shrink-0 h-5 w-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="flex flex-col text-gray-500 text-sm truncate">
              <span class="truncate">Sales to June Hansen</span>
              <span>
                <span class="text-gray-900 font-medium">$20,000</span>
                USD
              </span>
              <time datetime="2020-07-11">July 11, 2020</time>
            </span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
               class="flex-shrink-0 h-5 w-5 text-gray-400">
            <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"></path>
          </svg>
        </span>
      </a></li>
      <li><a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
        <span class="flex items-center space-x-4">
          <span class="flex-1 flex space-x-2 truncate">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                 stroke="currentColor" aria-hidden="true" class="flex-shrink-0 h-5 w-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="flex flex-col text-gray-500 text-sm truncate">
              <span class="truncate">Sales to Molly Sanders</span>
              <span>
                <span class="text-gray-900 font-medium">$20,000</span>
                USD
              </span>
              <time datetime="2020-07-11">July 11, 2020</time>
            </span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
               class="flex-shrink-0 h-5 w-5 text-gray-400">
            <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"></path>
          </svg>
        </span>
      </a></li>
      <li><a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
        <span class="flex items-center space-x-4">
          <span class="flex-1 flex space-x-2 truncate">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                 stroke="currentColor" aria-hidden="true" class="flex-shrink-0 h-5 w-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="flex flex-col text-gray-500 text-sm truncate">
              <span class="truncate">Sales to Peter Pan</span>
              <span>
                <span class="text-gray-900 font-medium">$20,000</span>
                USD
              </span>
              <time datetime="2020-07-11">July 11, 2020</time>
            </span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
               class="flex-shrink-0 h-5 w-5 text-gray-400">
            <path fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"></path>
          </svg>
        </span>
      </a></li>
    </ul>
    <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200" aria-label="Pagination">
      <div class="flex-1 flex justify-between"><a href="#"
                                                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
        Previous </a><a href="#"
                        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
        Next </a></div>
    </nav>
  </div>

</template>

<script>
export default {
  name: "DataTable"
}
</script>

<style scoped>

</style>