<script>
    import {Theme} from "carbon-components-svelte";
    import "carbon-components-svelte/css/all.css";
</script>


<Theme
		theme="g100"
		tokens={{
    "interactive-01": "#06699f",
    "hover-primary": "#0c7fbf",
    "active-primary": "#095177",
  }}
/>

<slot/>



<style global>

    .teamNameRow {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .teamNameRow > a {
        font-weight: 900;
        color: white;
    }

    .teamNameRow.away {
        flex-direction: row-reverse;
    }

    .teamLogo {
        height: 3em;
        width: 3em;
        margin: 0 1em;
    }

    .time-col {
        min-width: 9em;
    }

    .time-col > a {
        color: inherit;
        text-decoration: none;
        font-weight: 500;
    }

    .roster-table {
        text-align: right;
        display: flex;
        flex-direction: column;
        height: 14em;
    }

    .roster-table.away {
        text-align: left;
    }

    .roster-table > div {
        padding: .5em;
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .roster-table.away > div {
        flex-direction: row-reverse;
    }

    .roster-table > div > div {
        flex-grow: 1;
    }

    .roster-table > div > div > a {
        color: #eee;
        text-decoration: none;
    }

    .roster-table > div > img {
        height: 2.3em;
        width: 2.3em;
        margin: -0.5em 0 -0.5em 1em;
    }

    .roster-table.away > div > img {
        margin-left: 0;
        margin-right: 1em;
    }

    .roster-table > div:nth-child(2n) {
        background-color: #333;
    }

    .roster-table > div:nth-child(2n+1) {
        background-color: #2f2f2f;
    }

    @media screen and (max-width: 1200px) {
        :global(.bx--btn-set .bx--btn) {
            max-width: 7em;
        }

        :global(.bx--btn-set) {
            flex-wrap: wrap;
        }
    }


    .bx--data-table-container {
        position: relative;
        padding-top: .125rem
    }

    .bx--data-table-content {
        overflow-x: auto
    }

    .bx--data-table-header {
        padding: 1rem 0 1.5rem 1rem;
        background: #262626
    }

    .bx--data-table-header__title {
        font-size: 1.25rem;
        font-weight: 400;
        line-height: 1.4;
        letter-spacing: 0;
        color: #f4f4f4
    }

    .bx--data-table-header__description {
        font-size: .875rem;
        font-weight: 400;
        line-height: 1.28572;
        letter-spacing: .16px;
        color: #c6c6c6
    }

    .bx--data-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0
    }

    .bx--data-table thead {
        font-size: .875rem;
        font-weight: 600;
        line-height: 1.28572;
        letter-spacing: .16px;
        background-color: #393939
    }

    .bx--data-table tbody {
        font-size: .875rem;
        font-weight: 400;
        line-height: 1.28572;
        letter-spacing: .16px;
        width: 100%;
        background-color: #262626
    }

    .bx--data-table tr {
        width: 100%;
        height: 3rem;
        border: none
    }

    .bx--data-table tbody tr,
    .bx--data-table tbody tr td,
    .bx--data-table tbody tr th {
        transition: background-color 70ms cubic-bezier(0, 0, 0.38, 0.9)
    }

    .bx--data-table tbody tr:hover {
        background: #353535
    }

    .bx--data-table tbody tr:hover td,
    .bx--data-table tbody tr:hover th {
        border-top: 1px solid #353535;
        border-bottom: 1px solid #353535;
        background: #353535;
        color: #f4f4f4
    }

    .bx--data-table tr:hover .bx--link {
        color: #a6c8ff
    }

    .bx--data-table tr:hover .bx--link--disabled {
        color: #525252
    }

    .bx--data-table th,
    .bx--data-table td {
        text-align: left;
        vertical-align: middle
    }

    .bx--data-table th[align=right],
    .bx--data-table td[align=right] {
        text-align: right
    }

    .bx--data-table th[align=center],
    .bx--data-table td[align=center] {
        text-align: center
    }

    .bx--data-table th {
        padding-right: 1rem;
        padding-left: 1rem;
        background-color: #393939;
        color: #f4f4f4
    }

    .bx--data-table th:last-of-type {
        position: static;
        width: auto
    }

    .bx--data-table td,
    .bx--data-table tbody th {
        padding-right: 1rem;
        padding-left: 1rem;
        border-top: 1px solid #262626;
        border-bottom: 1px solid #393939;
        background: #262626;
        color: #c6c6c6
    }

    .bx--data-table td + td:first-of-type,
    .bx--data-table tbody th + td:first-of-type {
        padding-left: .75rem
    }

    @supports (-moz-appearance: none) {
        .bx--data-table td {
            background-clip: padding-box
        }
    }

    .bx--data-table .bx--list-box input[role=combobox],
    .bx--data-table .bx--list-box input[type=text],
    .bx--data-table .bx--dropdown,
    .bx--data-table .bx--list-box,
    .bx--data-table .bx--number input[type=number],
    .bx--data-table .bx--number__control-btn::before,
    .bx--data-table .bx--number__control-btn::after,
    .bx--data-table .bx--text-input,
    .bx--data-table .bx--select-input {
        background-color: #393939
    }

    .bx--data-table td.bx--table-column-menu .bx--overflow-menu[aria-expanded=false]:focus {
        outline: 2px solid #fff;
        outline-offset: -2px
    }

    @media screen and (prefers-contrast) {
        .bx--data-table td.bx--table-column-menu .bx--overflow-menu[aria-expanded=false]:focus {
            outline-style: dotted
        }
    }

    .bx--data-table td.bx--table-column-menu .bx--overflow-menu[aria-expanded=true]:focus {
        outline: none
    }

    @media screen and (hover: hover),(-ms-high-contrast: active),(-ms-high-contrast: none) {
        .bx--data-table td.bx--table-column-menu .bx--overflow-menu .bx--overflow-menu__icon {
            opacity: 0
        }
    }

    .bx--data-table td.bx--table-column-menu .bx--overflow-menu.bx--overflow-menu--open .bx--overflow-menu__icon {
        opacity: 1
    }

    .bx--data-table.bx--data-table--visible-overflow-menu td.bx--table-column-menu .bx--overflow-menu .bx--overflow-menu__icon,
    .bx--data-table td.bx--table-column-menu .bx--overflow-menu:hover .bx--overflow-menu__icon,
    .bx--data-table td.bx--table-column-menu .bx--overflow-menu:focus .bx--overflow-menu__icon,
    .bx--data-table tr:hover td.bx--table-column-menu .bx--overflow-menu .bx--overflow-menu__icon {
        opacity: 1
    }

    .bx--table-row--menu-option .bx--overflow-menu-options__btn .bx--overflow-menu-options__option-content svg {
        position: relative;
        top: .1875rem;
        margin-right: .5rem
    }

    .bx--data-table .bx--overflow-menu:hover,
    .bx--data-table .bx--overflow-menu__trigger:hover {
        background-color: #4c4c4c
    }

    .bx--data-table--selected .bx--overflow-menu:hover,
    .bx--data-table--selected .bx--overflow-menu__trigger:hover {
        background-color: #353535
    }

    .bx--data-table--selected .bx--link:not(.bx--link--disabled) {
        color: #a6c8ff
    }

    .bx--data-table--compact td.bx--table-column-menu,
    .bx--data-table--xs td.bx--table-column-menu,
    .bx--data-table--short td.bx--table-column-menu,
    .bx--data-table--sm td.bx--table-column-menu {
        height: 1.5rem;
        padding-top: 0;
        padding-bottom: 0
    }

    .bx--data-table--short td.bx--table-column-menu,
    .bx--data-table--sm td.bx--table-column-menu {
        height: 2rem
    }

    .bx--data-table--md td.bx--table-column-menu {
        height: 2.5rem
    }

    .bx--data-table--tall .bx--table-column-menu,
    .bx--data-table--xl .bx--table-column-menu {
        padding-top: .5rem
    }

    .bx--data-table--zebra tbody tr:not(.bx--parent-row):nth-child(odd) td {
        border-bottom: 1px solid #262626
    }

    .bx--data-table--zebra tbody tr:not(.bx--parent-row):nth-child(even) td {
        border-top: 1px solid #393939;
        border-bottom: 1px solid #393939;
        background-color: #393939
    }

    .bx--data-table--zebra tbody tr:not(.bx--parent-row):hover td {
        border-top: 1px solid #353535;
        border-bottom: 1px solid #353535;
        background-color: #353535
    }

    .bx--table-column-checkbox .bx--checkbox-label {
        padding-left: 0
    }

    .bx--data-table th.bx--table-column-checkbox {
        position: static;
        width: 2rem;
        background: #393939;
        transition: background-color 70ms cubic-bezier(0, 0, 0.38, 0.9)
    }

    .bx--data-table .bx--table-column-checkbox .bx--checkbox:focus + .bx--checkbox-label::before {
        outline-offset: .375rem
    }

    .bx--data-table--compact .bx--table-column-checkbox .bx--checkbox:focus + .bx--checkbox-label::before,
    .bx--data-table--xs .bx--table-column-checkbox .bx--checkbox:focus + .bx--checkbox-label::before {
        outline-offset: .125rem
    }

    .bx--data-table thead th.bx--table-column-checkbox,
    .bx--data-table tbody td.bx--table-column-checkbox,
    .bx--data-table thead th.bx--table-expand,
    .bx--data-table tbody td.bx--table-expand {
        min-width: 0
    }

    .bx--data-table thead th.bx--table-column-checkbox,
    .bx--data-table tbody td.bx--table-column-checkbox {
        width: 2.5rem;
        padding-right: .25rem;
        padding-left: 1rem
    }

    .bx--data-table thead th.bx--table-expand,
    .bx--data-table tbody td.bx--table-expand {
        width: 2rem;
        height: 2rem
    }

    .bx--data-table--compact thead th.bx--table-expand,
    .bx--data-table--compact tbody td.bx--table-expand,
    .bx--data-table--xs thead th.bx--table-expand,
    .bx--data-table--xs tbody td.bx--table-expand {
        width: 1.5rem;
        height: 1.5rem;
        padding: 0 0 0 .5rem
    }

    .bx--data-table--short thead th.bx--table-expand,
    .bx--data-table--short tbody td.bx--table-expand,
    .bx--data-table--sm thead th.bx--table-expand,
    .bx--data-table--sm tbody td.bx--table-expand {
        width: 2rem;
        height: 2rem;
        padding: 0;
        padding-left: .5rem
    }

    .bx--data-table--md thead th.bx--table-expand,
    .bx--data-table--md tbody td.bx--table-expand {
        width: 2.5rem;
        height: 2.5rem;
        padding: .25rem 0 .25rem .5rem
    }

    .bx--data-table--tall thead th.bx--table-expand,
    .bx--data-table--tall tbody td.bx--table-expand,
    .bx--data-table--xl thead th.bx--table-expand,
    .bx--data-table--xl tbody td.bx--table-expand {
        height: 4rem;
        padding-top: .625rem;
        padding-bottom: 1.375rem
    }

    .bx--data-table--tall .bx--table-column-checkbox,
    .bx--data-table--xl .bx--table-column-checkbox {
        padding-top: .8125rem
    }

    .bx--data-table--tall .bx--table-column-radio,
    .bx--data-table--xl .bx--table-column-radio {
        padding-top: 1rem
    }

    tr.bx--data-table--selected:hover .bx--radio-button[disabled] + .bx--radio-button__label,
    tr.bx--data-table--selected:hover .bx--checkbox[disabled] + .bx--checkbox-label,
    tr.bx--data-table--selected:hover .bx--link--disabled {
        color: #8d8d8d
    }

    tr.bx--data-table--selected:hover .bx--radio-button[disabled] + .bx--radio-button__label .bx--radio-button__appearance,
    tr.bx--data-table--selected:hover .bx--checkbox[disabled] + .bx--checkbox-label:before {
        border-color: #8d8d8d
    }

    .bx--table-column-radio {
        width: 48px
    }

    .bx--table-column-radio .bx--radio-button__appearance {
        margin-right: -0.125rem
    }

    .bx--data-table--zebra tbody tr:nth-child(odd).bx--data-table--selected td,
    tr.bx--data-table--selected td {
        border-top: 1px solid #393939;
        border-bottom: 1px solid #525252;
        background-color: #393939;
        color: #f4f4f4
    }

    .bx--data-table--zebra tbody tr:first-of-type:nth-child(odd).bx--data-table--selected td,
    tr.bx--data-table--selected:first-of-type td {
        border-top: 1px solid #525252
    }

    .bx--data-table--zebra tbody tr:last-of-type:nth-child(odd).bx--data-table--selected td,
    .bx--data-table--zebra tbody tr:last-of-type:nth-child(even).bx--data-table--selected td,
    tr.bx--data-table--selected:last-of-type td {
        border-top: 1px solid #393939;
        border-bottom: 1px solid #393939
    }

    .bx--data-table--zebra tbody tr:nth-child(even).bx--data-table--selected td {
        border-bottom: 1px solid #525252
    }

    .bx--data-table--zebra tbody tr:nth-child(even).bx--data-table--selected:hover td {
        border-bottom: 1px solid #4c4c4c
    }

    .bx--data-table--zebra tbody tr:nth-child(odd).bx--data-table--selected:hover td,
    .bx--data-table tbody .bx--data-table--selected:hover td {
        border-top: 1px solid #4c4c4c;
        border-bottom: 1px solid #4c4c4c;
        background: #4c4c4c;
        color: #f4f4f4
    }

    .bx--data-table--selected .bx--overflow-menu .bx--overflow-menu__icon {
        opacity: 1
    }

    .bx--data-table--compact thead tr,
    .bx--data-table--compact tbody tr,
    .bx--data-table--compact tbody tr th {
        height: 1.5rem
    }

    .bx--data-table--compact .bx--table-header-label {
        padding-top: .125rem;
        padding-bottom: .125rem
    }

    .bx--data-table--compact td,
    .bx--data-table--compact tbody tr th {
        padding-top: .125rem;
        padding-bottom: .125rem
    }

    .bx--data-table--compact .bx--overflow-menu {
        width: 2rem;
        height: 100%
    }

    .bx--data-table.bx--data-table--compact .bx--table-column-checkbox {
        padding-top: 0;
        padding-bottom: 0
    }

    .bx--data-table.bx--data-table--compact .bx--table-column-checkbox .bx--checkbox-label {
        height: 1.4375rem;
        min-height: 1.4375rem
    }

    .bx--data-table--xs thead tr,
    .bx--data-table--xs tbody tr,
    .bx--data-table--xs tbody tr th {
        height: 1.5rem
    }

    .bx--data-table--xs .bx--table-header-label {
        padding-top: .125rem;
        padding-bottom: .125rem
    }

    .bx--data-table--xs td,
    .bx--data-table--xs tbody tr th {
        padding-top: .125rem;
        padding-bottom: .125rem
    }

    .bx--data-table--xs .bx--overflow-menu {
        width: 2rem;
        height: calc(100% + 1px)
    }

    .bx--data-table.bx--data-table--xs .bx--table-column-checkbox {
        padding-top: 0;
        padding-bottom: 0
    }

    .bx--data-table.bx--data-table--xs .bx--table-column-checkbox .bx--checkbox-label {
        height: 1.4375rem;
        min-height: 1.4375rem
    }

    .bx--data-table--short thead tr,
    .bx--data-table--short tbody tr,
    .bx--data-table--short tbody tr th {
        height: 2rem
    }

    .bx--data-table--short .bx--table-header-label {
        padding-top: .4375rem;
        padding-bottom: .4375rem
    }

    .bx--data-table--short td,
    .bx--data-table--short tbody tr th {
        padding-top: .4375rem;
        padding-bottom: .375rem
    }

    .bx--data-table.bx--data-table--short .bx--table-column-checkbox {
        padding-top: .1875rem;
        padding-bottom: .1875rem
    }

    .bx--data-table--short .bx--overflow-menu {
        height: 100%
    }

    .bx--data-table--sm thead tr,
    .bx--data-table--sm tbody tr,
    .bx--data-table--sm tbody tr th {
        height: 2rem
    }

    .bx--data-table--sm .bx--table-header-label {
        padding-top: .4375rem;
        padding-bottom: .4375rem
    }

    .bx--data-table--sm td,
    .bx--data-table--sm tbody tr th {
        padding-top: .4375rem;
        padding-bottom: .375rem
    }

    .bx--data-table.bx--data-table--sm .bx--table-column-checkbox {
        padding-top: .1875rem;
        padding-bottom: .1875rem
    }

    .bx--data-table--sm .bx--overflow-menu {
        height: calc(100% + 1px)
    }

    .bx--data-table--md thead tr,
    .bx--data-table--md tbody tr,
    .bx--data-table--md tbody tr th {
        height: 2.5rem
    }

    .bx--data-table--md .bx--table-header-label {
        padding-top: .4375rem;
        padding-bottom: .4375rem
    }

    .bx--data-table--md td,
    .bx--data-table--md tbody tr th {
        padding-top: .4375rem;
        padding-bottom: .375rem
    }

    .bx--data-table.bx--data-table--md .bx--table-column-checkbox {
        padding-top: .1875rem;
        padding-bottom: .1875rem
    }

    .bx--data-table--md .bx--table-column-menu {
        padding-top: .1875rem;
        padding-bottom: .1875rem
    }

    .bx--data-table--tall thead tr,
    .bx--data-table--tall tbody tr,
    .bx--data-table--tall tbody tr th {
        height: 4rem
    }

    .bx--data-table--tall .bx--table-header-label {
        padding-top: 1rem;
        padding-bottom: 1rem
    }

    .bx--data-table--tall td,
    .bx--data-table--tall tbody tr th {
        padding-top: 1rem
    }

    .bx--data-table--tall th,
    .bx--data-table--tall td {
        vertical-align: top
    }

    .bx--data-table--tall .bx--data-table--cell-secondary-text {
        font-size: .75rem;
        font-weight: 400;
        line-height: 1.33333;
        letter-spacing: .32px
    }

    .bx--data-table--xl thead tr,
    .bx--data-table--xl tbody tr,
    .bx--data-table--xl tbody tr th {
        height: 4rem
    }

    .bx--data-table--xl .bx--table-header-label {
        padding-top: 1rem;
        padding-bottom: 1rem
    }

    .bx--data-table--xl td,
    .bx--data-table--xl tbody tr th {
        padding-top: 1rem
    }

    .bx--data-table--xl th,
    .bx--data-table--xl td {
        vertical-align: top
    }

    .bx--data-table--xl .bx--data-table--cell-secondary-text {
        font-size: .75rem;
        font-weight: 400;
        line-height: 1.33333;
        letter-spacing: .32px
    }

    .bx--data-table--static {
        width: auto
    }

    .bx--data-table-container--static {
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content
    }

    .bx--data-table_inner-container {
        background-color: #393939;
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }

    .bx--data-table--sticky-header {
        display: block;
        overflow-y: scroll
    }

    .bx--data-table--sticky-header thead,
    .bx--data-table--sticky-header tbody,
    .bx--data-table--sticky-header tr,
    .bx--data-table--sticky-header th,
    .bx--data-table--sticky-header td {
        display: flex
    }

    .bx--data-table--sticky-header thead {
        position: sticky;
        z-index: 1;
        top: 0;
        overflow: scroll;
        width: 100%;
        -ms-overflow-style: none;
        will-change: transform
    }

    .bx--data-table--sticky-header thead tr th {
        border-bottom: 1px solid #525252
    }

    .bx--data-table--sticky-header tbody {
        flex-direction: column;
        -ms-overflow-style: none;
        overflow-x: scroll;
        will-change: transform
    }

    .bx--data-table--sticky-header tr.bx--parent-row.bx--expandable-row {
        height: auto;
        min-height: 3rem
    }

    .bx--data-table--sticky-header tr.bx--expandable-row:not(.bx--parent-row) {
        height: auto
    }

    .bx--data-table--sticky-header .bx--table-expand {
        max-width: 3rem
    }

    .bx--data-table--sticky-header thead .bx--table-expand {
        align-items: center
    }

    .bx--data-table--sticky-header .bx--parent-row {
        min-height: 3rem
    }

    .bx--data-table--sticky-header:not(.bx--data-table--compact):not(.bx--data-table--xs):not(.bx--data-table--tall):not(.bx--data-table--xl):not(.bx--data-table--short):not(.bx--data-table--sm) td:not(.bx--table-column-menu):not(.bx--table-column-checkbox) {
        padding-top: .875rem
    }

    .bx--data-table--sticky-header tr.bx--parent-row.bx--expandable-row:hover + tr[data-child-row] td {
        border-top: 1px solid #353535
    }

    .bx--data-table--sticky-header tr.bx--expandable-row:last-of-type {
        overflow: hidden
    }

    .bx--data-table--sticky-header tr.bx--data-table--selected:first-of-type td {
        border-top: none
    }

    .bx--data-table--sticky-header thead th.bx--table-column-checkbox,
    .bx--data-table--sticky-header tbody tr td.bx--table-column-checkbox {
        width: 2.25rem;
        min-width: 2.25rem;
        align-items: center
    }

    .bx--data-table--sticky-header.bx--data-table--tall thead th.bx--table-column-checkbox,
    .bx--data-table--sticky-header.bx--data-table--xl thead th.bx--table-column-checkbox,
    .bx--data-table--sticky-header.bx--data-table--tall td.bx--table-column-checkbox,
    .bx--data-table--sticky-header.bx--data-table--xl td.bx--table-column-checkbox {
        align-items: flex-start
    }

    .bx--data-table--sticky-header th.bx--table-column-checkbox ~ th:last-of-type:empty {
        max-width: 4rem
    }

    .bx--data-table--sticky-header th:empty:not(.bx--table-expand) {
        max-width: 2.25rem
    }

    .bx--data-table--sticky-header td.bx--table-column-menu {
        height: auto;
        align-items: center;
        padding-top: 0
    }

    .bx--data-table--sticky-header thead::-webkit-scrollbar,
    .bx--data-table--sticky-header tbody::-webkit-scrollbar {
        display: none
    }

    @-moz-document url-prefix() {
        .bx--data-table--sticky-header thead,
        .bx--data-table--sticky-header tbody {
            scrollbar-width: none
        }
    }

    .bx--data-table--sticky-header tbody tr:last-of-type {
        border-bottom: 0
    }

    .bx--data-table--sticky-header th:not(.bx--table-column-checkbox):not(.bx--table-column-menu):not(.bx--table-expand-v2):not(.bx--table-column-icon),
    .bx--data-table--sticky-header td:not(.bx--table-column-checkbox):not(.bx--table-column-menu):not(.bx--table-expand-v2):not(.bx--table-column-icon) {
        width: 100%;
        min-width: 0
    }

    .bx--data-table--sticky-header.bx--data-table--compact tr:not(.bx--expandable-row),
    .bx--data-table--sticky-header.bx--data-table--xs tr:not(.bx--expandable-row),
    .bx--data-table--sticky-header.bx--data-table--short tr:not(.bx--expandable-row),
    .bx--data-table--sticky-header.bx--data-table--sm tr:not(.bx--expandable-row),
    .bx--data-table--sticky-header.bx--data-table--tall tr:not(.bx--expandable-row),
    .bx--data-table--sticky-header.bx--data-table--xl tr:not(.bx--expandable-row) {
        height: auto
    }

    .bx--data-table--sticky-header.bx--data-table--compact tr:not(.bx--expandable-row),
    .bx--data-table--sticky-header.bx--data-table--xs tr:not(.bx--expandable-row) {
        min-height: 1.5rem
    }

    .bx--data-table--sticky-header.bx--data-table--short tr:not(.bx--expandable-row),
    .bx--data-table--sticky-header.bx--data-table--sm tr:not(.bx--expandable-row) {
        min-height: 2rem
    }

    .bx--data-table--sticky-header.bx--data-table--tall tr:not(.bx--expandable-row),
    .bx--data-table--sticky-header.bx--data-table--xl tr:not(.bx--expandable-row) {
        min-height: 4rem
    }

    .bx--data-table--sticky-header.bx--data-table--compact tr td.bx--table-expand,
    .bx--data-table--sticky-header.bx--data-table--xs tr td.bx--table-expand {
        padding-top: .25rem
    }

    .bx--data-table--sticky-header.bx--data-table--short tr td.bx--table-expand,
    .bx--data-table--sticky-header.bx--data-table--sm tr td.bx--table-expand {
        padding-top: .5rem
    }

    .bx--data-table--sticky-header .bx--table-header-label {
        display: block;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: calc(100% - 10px);
        padding-top: .9375rem;
        padding-bottom: 1rem;
        overflow-y: hidden
    }

    .bx--data-table--sticky-header.bx--data-table--compact th .bx--table-header-label,
    .bx--data-table--sticky-header.bx--data-table--xs th .bx--table-header-label {
        padding-top: .1875rem;
        padding-bottom: 0
    }

    .bx--data-table--sticky-header.bx--data-table--short th .bx--table-header-label,
    .bx--data-table--sticky-header.bx--data-table--sm th .bx--table-header-label {
        padding-top: .5rem;
        padding-bottom: 0
    }

    .bx--data-table--sticky-header.bx--data-table--tall th .bx--table-header-label,
    .bx--data-table--sticky-header.bx--data-table--xl th .bx--table-header-label {
        padding-top: 1rem
    }

    .bx--data-table--sticky-header.bx--data-table--tall th.bx--table-expand,
    .bx--data-table--sticky-header.bx--data-table--xl th.bx--table-expand {
        display: flex;
        align-items: flex-start
    }

    .bx--data-table--sticky-header.bx--data-table--compact tr.bx--parent-row .bx--table-column-checkbox,
    .bx--data-table--sticky-header.bx--data-table--short tr.bx--parent-row .bx--table-column-checkbox,
    .bx--data-table--sticky-header.bx--data-table--xs tr.bx--parent-row .bx--table-column-checkbox,
    .bx--data-table--sticky-header.bx--data-table--sm tr.bx--parent-row .bx--table-column-checkbox {
        align-items: flex-start
    }

    .bx--data-table--max-width {
        max-width: 100%
    }

    .bx--data-table--sticky-header {
        max-height: 18.75rem
    }

    .bx--data-table .bx--form-item.bx--checkbox-wrapper:last-of-type {
        margin: 0
    }

    .bx--data-table--short .bx--form-item.bx--checkbox-wrapper:last-of-type,
    .bx--data-table--compact .bx--form-item.bx--checkbox-wrapper:last-of-type,
    .bx--data-table--xs .bx--form-item.bx--checkbox-wrapper:last-of-type,
    .bx--data-table--sm .bx--form-item.bx--checkbox-wrapper:last-of-type {
        margin: -0.1875rem 0
    }

    @media screen and (-ms-high-contrast: active),(forced-colors: active),(prefers-contrast) {
        .bx--data-table-content {
            outline: 1px solid rgba(0, 0, 0, 0)
        }
    }

    .bx--data-table tr.bx--parent-row:first-of-type td {
        border-top: 1px solid #393939
    }

    .bx--data-table--sort th {
	    padding: initial;
    }
</style>