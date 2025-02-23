import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSquare,
    faCheckSquare,
    faQuestionCircle
} from '@fortawesome/free-regular-svg-icons'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {
    authors: Facet[]
    title: string
    model: string
    url: string
}

interface Facet {
    id: string
    title: string
    count: number
}

const AuthorsFacet: React.FunctionComponent<Props> = ({
    authors,
    title,
    model,
    url
}) => {
    const router = useRouter()

    const tooltipAuthors = (
        <Tooltip id="tooltipAuthors">
            This list includes only {title} with ORCID ids.
        </Tooltip>
    )

    function facetLink(param: string, value: string, id: string) {
        let icon = faSquare

        // get current query parameters from next router
        const params = new URLSearchParams(router.query as any)

        // delete model and cursor parameters
        params.delete(model)
        params.delete('cursor')

        if (params.get(param) == value) {
            // if param is present, delete from query and use checked icon
            params.delete(param)
            icon = faCheckSquare
        } else {
            // otherwise replace param with new value and use unchecked icon
            params.set(param, value)
        }

        return (
            <Link href={url + params.toString()}>
                <a id={id}>
                    <FontAwesomeIcon icon={icon} />{' '}
                </a>
            </Link>
        )
    }

    // Used for checking filter shouldnt show author that is already filtered
    function checkAuthorForPerson(author) {
        // Only works on person model
        if (model == 'person') {
            const orcid_id = url.substring(11, url.length - 2)
            if (!author.id.includes(orcid_id)) {
                return author
            }
        } else {
            return author
        }
    }

    return (
        <React.Fragment>
            {authors && authors.length > 0 && (
                <div className="panel facets add">
                    <div className="panel-body">
                        <OverlayTrigger placement="top" overlay={tooltipAuthors}>
                            <h4>
                                {title} <FontAwesomeIcon icon={faQuestionCircle} />
                            </h4>
                        </OverlayTrigger>
                        <ul id="authors-facets">
                            {authors.filter(checkAuthorForPerson).map((facet) => (
                                <li key={facet.id}>
                                    {facetLink(
                                        'filterQuery',
                                        'creators.nameIdentifiers.nameIdentifier:"' +
                                        facet.id +
                                        '"',
                                        'co-authors-facet-' + facet.id
                                    )}
                                    <div className="facet-title">{facet.title}</div>
                                    <span className="number pull-right">
                                        {facet.count.toLocaleString('en-US')}
                                    </span>
                                    <div className="clearfix" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </React.Fragment>
    )

}
export default AuthorsFacet
