<template>

  <div
      class="board-draggable relative flex max-h-full w-72 shrink-0 flex-col"
  >
    <div
        class="board-draggable-handler flex items-center justify-between px-0.5 pb-3"
    >
      <div class="flex items-center space-x-2">
        <div
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-info/10 text-info"
        >
          <i class="fa fa-spinner text-base"></i>
        </div>
        <h3 class="text-base text-slate-700 dark:text-navy-100">
          {{ name }}
        </h3>
      </div>

      <div id="in_progress" class="inline-flex">
        <button
            class="popper-ref btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>

        <div class="popper-root">
          <div
              class="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700"
          >
            <ul>
              <li>
                <a
                    data-toggle="modal"
                    data-target="#editBoard"
                    href="#"
                    class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                >Edit</a
                >
              </li>
            </ul>
            <div
                class="my-1 h-px bg-slate-150 dark:bg-navy-500"
            ></div>
            <ul>
              <li>
                <a
                    data-toggle="modal"
                    data-target="#deleteBoard"
                    href="#"
                    class="flex text-error h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
                >
                  <i class="fa fa-trash mr-2"></i>
                  <span>Delete</span>
                </a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
        id="tasks-progress-list"
        class="is-scrollbar-hidden relative space-y-2.5 overflow-y-auto p-0.5"
    >


      <div class="card cursor-pointer shadow-sm">
        <div class="rounded-lg bg-info/10 px-2.5 pb-2 pt-1.5">
          <div>
            <div class="flex justify-between">
              <a
                  href="/tasks/view.html"
                  class="font-medium tracking-wide text-info line-clamp-2"
              >
                Update Design
              </a>
            </div>

            <p
                class="mt-px text-xs text-slate-400 dark:text-navy-300"
            >
              Update design process for the mobile app
            </p>
          </div>
          <div class="mt-2 mb-2 space-x-1">
            <div
                class="badge bg-info/10 py-1 px-1.5 text-info dark:bg-info/15"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span> Jun 12</span>
            </div>

            <div
                class="badge space-x-1 bg-error/10 py-1 px-1.5 text-error dark:bg-error/15"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                />
              </svg>
              <span>5/10</span>
            </div>

          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Update
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Performance
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div class="mt-3 flex items-end justify-between">
            <div class="flex flex-wrap -space-x-1.5">








              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8" >
                <img
                    class="rounded-full border-2 border-slate-50 dark:border-navy-900"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAIAAAByquWKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNS0yMlQxODoxMjoyOCswNTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZDcyNGIyOS04NzFkLThhNGQtYmVlYS04N2JiNDI0MWM2ZmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxODM0M2VkYy03NzQ0LTdkNDQtYmNm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"
                    alt="avatar"
                />
              </div>









              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                >
                  JD
                </div>
              </div>









              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                >
                  JD
                </div>
              </div>





              <div class="avatar h-6 w-6 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-info text-xs uppercase text-white dark:border-navy-900"
                >
                  +2
                </div>
              </div>


            </div>

          </div>
        </div>
        <div class="rounded-lg bg-info/10 px-2.5 pb-2 pt-1.5">
          <div>
            <div class="flex justify-between">
              <a
                  href="/tasks/view.html"
                  class="font-medium tracking-wide text-info line-clamp-2"
              >
                Update Design
              </a>
            </div>

            <p
                class="mt-px text-xs text-slate-400 dark:text-navy-300"
            >
              Update design process for the mobile app
            </p>
          </div>
          <div class="mt-2 mb-2 space-x-1">
            <div
                class="badge bg-info/10 py-1 px-1.5 text-info dark:bg-info/15"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span> Jun 12</span>
            </div>

            <div
                class="badge space-x-1 bg-error/10 py-1 px-1.5 text-error dark:bg-error/15"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                />
              </svg>
              <span>5/10</span>
            </div>

          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Update
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Performance
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div class="mt-3 flex items-end justify-between">
            <div class="flex flex-wrap -space-x-1.5">








              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8" >
                <img
                    class="rounded-full border-2 border-slate-50 dark:border-navy-900"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAIAAAByquWKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNS0yMlQxODoxMjoyOCswNTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZDcyNGIyOS04NzFkLThhNGQtYmVlYS04N2JiNDI0MWM2ZmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxODM0M2VkYy03NzQ0LTdkNDQtYmNm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"
                    alt="avatar"
                />
              </div>









              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                >
                  JD
                </div>
              </div>









              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                >
                  JD
                </div>
              </div>





              <div class="avatar h-6 w-6 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-info text-xs uppercase text-white dark:border-navy-900"
                >
                  +2
                </div>
              </div>


            </div>

          </div>
        </div>
        <div class="rounded-lg bg-info/10 px-2.5 pb-2 pt-1.5">
          <div>
            <div class="flex justify-between">
              <a
                  href="/tasks/view.html"
                  class="font-medium tracking-wide text-info line-clamp-2"
              >
                Update Design
              </a>
            </div>

            <p
                class="mt-px text-xs text-slate-400 dark:text-navy-300"
            >
              Update design process for the mobile app
            </p>
          </div>
          <div class="mt-2 mb-2 space-x-1">
            <div
                class="badge bg-info/10 py-1 px-1.5 text-info dark:bg-info/15"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span> Jun 12</span>
            </div>

            <div
                class="badge space-x-1 bg-error/10 py-1 px-1.5 text-error dark:bg-error/15"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                />
              </svg>
              <span>5/10</span>
            </div>

          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Update
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Performance
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div class="mt-3 flex items-end justify-between">
            <div class="flex flex-wrap -space-x-1.5">








              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8" >
                <img
                    class="rounded-full border-2 border-slate-50 dark:border-navy-900"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAIAAAByquWKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNS0yMlQxODoxMjoyOCswNTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZDcyNGIyOS04NzFkLThhNGQtYmVlYS04N2JiNDI0MWM2ZmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxODM0M2VkYy03NzQ0LTdkNDQtYmNm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"
                    alt="avatar"
                />
              </div>









              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                >
                  JD
                </div>
              </div>









              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                >
                  JD
                </div>
              </div>





              <div class="avatar h-6 w-6 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-info text-xs uppercase text-white dark:border-navy-900"
                >
                  +2
                </div>
              </div>


            </div>

          </div>
        </div>
        <div class="rounded-lg bg-info/10 px-2.5 pb-2 pt-1.5">
          <div>
            <div class="flex justify-between">
              <a
                  href="/tasks/view.html"
                  class="font-medium tracking-wide text-info line-clamp-2"
              >
                Update Design
              </a>
            </div>

            <p
                class="mt-px text-xs text-slate-400 dark:text-navy-300"
            >
              Update design process for the mobile app
            </p>
          </div>
          <div class="mt-2 mb-2 space-x-1">
            <div
                class="badge bg-info/10 py-1 px-1.5 text-info dark:bg-info/15"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span> Jun 12</span>
            </div>

            <div
                class="badge space-x-1 bg-error/10 py-1 px-1.5 text-error dark:bg-error/15"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                />
              </svg>
              <span>5/10</span>
            </div>

          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Update
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Performance
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div class="mt-3 flex items-end justify-between">
            <div class="flex flex-wrap -space-x-1.5">








              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8" >
                <img
                    class="rounded-full border-2 border-slate-50 dark:border-navy-900"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAIAAAByquWKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNS0yMlQxODoxMjoyOCswNTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZDcyNGIyOS04NzFkLThhNGQtYmVlYS04N2JiNDI0MWM2ZmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxODM0M2VkYy03NzQ0LTdkNDQtYmNm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"
                    alt="avatar"
                />
              </div>









              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                >
                  JD
                </div>
              </div>









              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                >
                  JD
                </div>
              </div>





              <div class="avatar h-6 w-6 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-info text-xs uppercase text-white dark:border-navy-900"
                >
                  +2
                </div>
              </div>


            </div>

          </div>
        </div>
        <div class="rounded-lg bg-info/10 px-2.5 pb-2 pt-1.5">
          <div>
            <div class="flex justify-between">
              <a
                  href="/tasks/view.html"
                  class="font-medium tracking-wide text-info line-clamp-2"
              >
                Update Design
              </a>
            </div>

            <p
                class="mt-px text-xs text-slate-400 dark:text-navy-300"
            >
              Update design process for the mobile app
            </p>
          </div>
          <div class="mt-2 mb-2 space-x-1">
            <div
                class="badge bg-info/10 py-1 px-1.5 text-info dark:bg-info/15"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span> Jun 12</span>
            </div>

            <div
                class="badge space-x-1 bg-error/10 py-1 px-1.5 text-error dark:bg-error/15"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                />
              </svg>
              <span>5/10</span>
            </div>

          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Update
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Performance
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div
              class="badge bg-primary/10 py-1 px-1.5 mt-0.5 text-primary dark:bg-accent-light/15 dark:text-accent-light"
          >
            Design
          </div>

          <div class="mt-3 flex items-end justify-between">
            <div class="flex flex-wrap -space-x-1.5">








              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8" >
                <img
                    class="rounded-full border-2 border-slate-50 dark:border-navy-900"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAIAAAByquWKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA1LTIyVDE4OjEyOjI4KzA1OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNS0yMlQxODoxMjoyOCswNTowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZDcyNGIyOS04NzFkLThhNGQtYmVlYS04N2JiNDI0MWM2ZmQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxODM0M2VkYy03NzQ0LTdkNDQtYmNm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"
                    alt="avatar"
                />
              </div>









              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                >
                  JD
                </div>
              </div>









              <div class="avatar h-6 w-6 hover:z-10 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-slate-500 text-xs uppercase text-white dark:border-navy-900"
                >
                  JD
                </div>
              </div>





              <div class="avatar h-6 w-6 sm:h-8 sm:w-8">
                <div
                    class="is-initial rounded-full border-2 border-slate-50 bg-info text-xs uppercase text-white dark:border-navy-900"
                >
                  +2
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>


    </div>
    <div class="flex justify-center py-2">
      <button
          data-toggle="modal"
          data-target="#newTask"
          class="flex items-center justify-center space-x-2 font-medium text-slate-600 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>New Task</span>
      </button>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>