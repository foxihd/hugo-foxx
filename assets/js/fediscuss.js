let replies = 0;
let reblogs = 0;
let favourites = 0;

const date = new Date();
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        formatMatcher: 'basic'
    }).replace(',', '').replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
}
const toISOString = (dateString) => {
    return new Date(dateString).toISOString()
}

{{ if not site.Params.EnableAppearance }}
const getElement = id => document.getElementById(id);
const getElements = selector => document.querySelectorAll(selector);
{{ end }}

const cmt = getElement('comments');
const { i18nReplies, i18nReblogs, i18nFavourites, i18nLoading, i18nErr, i18nNocomment } = cmt.dataset;

const fedRoot = getElement('fed-comments');

const addToCounter = (reply, reblog, favorite) => {
    replies = replies + reply;
    reblogs = reblogs + reblog;
    favourites = favourites + favorite;
}

const renderStat = (count, url, label, interaction) => `
    <a class='${interaction} ${count > 0 ? 'active' : ''}' href='${url}' rel='external noreferrer nofollow' aria-label='${label}'>
        <span>${count > 0 ? count : ''}</span>
    </a>
`;

const respondToVisibility = (element, callback) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
            }
        });
    });
    observer.observe(element);
}

const getURI = (url, format) => {
    const splitUrl = url.split('/');
    const isUrl = splitUrl[0] === 'https:' || splitUrl[0] === 'http:';
    return isUrl ? format(splitUrl) : url;
}

const checkResponseStatus = (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
    }
}

const mstdRoot = getElement('mstd-comments');

const cmtSty = document.createElement('style');
cmtSty.textContent = `#comments ul{position:relative;padding-left:0;list-style:none}#comments ul>li{border-radius:1ex;overflow:clip}#comments ul ul{margin-left:2rem}#comments ul::before{z-index:-1;position:absolute;top:0;right:0;bottom:0;left:0;border-left:3pt solid #80808008;border-radius:1ex;content:''}.fed-comments{margin:1.6rem 0;border-left:3pt solid var(--ac);background:#faf0e633;padding:1pc;overflow:auto}.author{justify-content:unset;gap:1rem;line-height:1}.author img{border-radius:2rem}.attachments{display:flex;margin:1ex 0;overflow:auto}.attachments *{flex-shrink:0;width:100%;height:auto}.attachments a::after{content:''}a.date,.stat a{opacity:.5;margin:0 2pt;color:inherit;font-size:var(--small)}.stat a.active{opacity:1;color:var(--ac)}.stat .favourites.active{color:red}.bluesky{display:inline-block}#join-discussion:hover .blueksy,#join-discussion-bluesky:hover .bluesky{transform-origin:center center;animation:flutter .2s alternate infinite}@keyframes flutter{from{transform:rotateY(0)}to{transform:rotateY(80deg)}}@media (min-width:641px){.fed-comments .content{padding-left:46pt}}`;
document.head.appendChild(cmtSty);

if (mstdRoot) {
    var mstdCommentsLoaded = false;
    const tootURL = mstdRoot.dataset.url;
    const mstdRootID = tootURL.split('/')[4];
    const toMastodonURI = (splitUrl) => `https://${splitUrl[2]}/api/v1/statuses/${splitUrl[4]}`;
    const mstdAPI = getURI(tootURL, toMastodonURI);

    if (mstdAPI !== tootURL) {

        const loadMstdAPI = async () => {
            if (mstdCommentsLoaded) return;

            if (!fedRoot) {
                mstdRoot.innerHTML = `<span id=mstdIsLoading class=loading>${i18nLoading}</span>`;
            }

            try {
                const [tootResponse, contextResponse] = await Promise.all([
                    fetch(mstdAPI),
                    fetch(mstdAPI + `/context`)
                ]);
                const [toot, data] = await Promise.all([
                    tootResponse.json(),
                    contextResponse.json()
                ]);
                checkResponseStatus(tootResponse);
                checkResponseStatus(contextResponse);

                addToCounter(toot.replies_count, toot.reblogs_count, toot.favourites_count);

                if (!fedRoot) {
                    getElement('stats').innerHTML = renderMstdStat(toot);
                    getElement('mstdIsLoading').remove();
                }
                getElement('discussion-starter-content').innerHTML = renderMstdContent(toot);

                if (replies > 0) {
                    mstdRoot.setAttribute('role', 'feed');
                    typeof DOMPurify !== 'undefined'
                        ? DOMPurify.sanitize(renderToots(data.descendants, mstdRootID), { RETURN_DOM_FRAGMENT: true })
                        : renderToots(data.descendants, mstdRootID);
                } else {
                    if (!fedRoot) {
                        mstdRoot.innerHTML = i18nNocomment;
                    }
                }

                mstdCommentsLoaded = true;
                mstdRoot.setAttribute('aria-busy', 'false');

            } catch (error) {
                console.error(`Mastodon ${i18nErr}`, error);
                mstdRoot.innerHTML = `Mastodon ${i18nErr} : ${error}`;
            }
        }

        respondToVisibility(mstdRoot, loadMstdAPI);
    }

    const renderMstdContent = (toot) => {
        const attachments = 
            toot.media_attachments.length > 0 
            ? `<div class='attachments'>${toot.media_attachments.map(renderMstdAttachment).join('')}</div>` 
            : '';

        return `
            <div>${toot.content}</div>
            ${attachments}
        `;
    }

    const renderMstdAttachment = (attachment) => {
        const attachmentTypes = {
            image: () => `<a href='${attachment.url}' rel='nofollow'><img src='${attachment.preview_url}' alt='${attachment.description}' loading='lazy' /></a>`,
            video: () => `<video controls preload='none'><source src='${attachment.url}' type='${attachment.mime_type}'></video>`,
            gifv: () => `<video autoplay loop muted playsinline><source src='${attachment.url}' type='${attachment.mime_type}'></video>`,
            audio: () => `<audio controls><source src='${attachment.url}' type='${attachment.mime_type}'></audio>`,
            default: () => `<a href='${attachment.url}' rel='nofollow'>${attachment.type}</a>`
        }

        if (attachmentTypes) {
            return (attachmentTypes[attachment.type] || attachmentTypes.default)();
        }

    }

    const renderMstdStat = (toot) => `
        ${renderStat(toot.replies_count, toot.url, i18nReplies, 'replies')}
        ${renderStat(toot.reblogs_count, `${toot.url}/reblogs`, i18nReblogs, 'reblogs')}
        ${renderStat(toot.favourites_count, `${toot.url}/favourites`, i18nFavourites, 'favourites')}
    `;

    const renderToot = (toot) => {
        const escapeHtml = (unsafe) => {
            return unsafe
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/'/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        const display_name = escapeHtml(toot.account.display_name);
        toot.account.display_name = display_name;
        toot.account.emojis.forEach(emoji => {
            toot.account.display_name = toot.account.display_name.replace(
                `:${emoji.shortcode}:`,
                `<img src='${escapeHtml(emoji.static_url)}' alt='Emoji ${emoji.shortcode}' height='20' width='20' />`
            );
        });

        const user_account = (account) => {
            let result = `@${account.acct}`;
            if (!account.acct.includes('@')) {
                const domain = new URL(account.url);
                result += `@${domain.hostname}`;
            }
            return result;
        }

        const node = document.createElement('li');
        node.id = `mstd${toot.id}`;
        node.dataset.date = toISOString(toot.created_at);
        node.innerHTML = `
            <article class='fed-comments mstd'>
              <div class='author'>
                <img src='${escapeHtml(toot.account.avatar_static)}' height=48 width=48 alt='${user_account(toot.account)}' loading='lazy'/>
                   <a class='has-desc' href='${toot.account.url}' rel='external noreferrer nofollow' aria-description='${user_account(toot.account)}'>
                     <span>${toot.account.display_name}</span>
                   </a>
              </div>
              <section class='content'>${renderMstdContent(toot)}</section>
              <div>
                <div class='stat'>${renderMstdStat(toot)}</div>
                  <a class='date' href='${toot.url}' rel='ugc external noreferrer nofollow'>
                    <time datetime='${toISOString(toot.created_at)}'>${toot.edited_at ? '*' : ''}${formatDate(toot.created_at)}</time>
                  </a>
              </div>
            </article>`;

        return node;
    }

    const renderToots = (toots, in_reply_to) => {
        const node = toots
            .filter(toot => toot.in_reply_to_id === in_reply_to);
        node.forEach(toot => {
            if (toot.in_reply_to_id === mstdRootID) {
                if (fedRoot) {
                    fedRoot.appendChild(renderToot(toot));
                } else {
                    mstdRoot.appendChild(renderToot(toot));
                }
            } else {
                const hasChildren = toots.find(t => t.id === toot.in_reply_to_id);
                if (hasChildren) {
                    const ul = document.createElement('ul');
                    getElement(`mstd${toot.in_reply_to_id}`)
                        .appendChild(ul)
                        .appendChild(renderToot(toot));
                }
            }
            renderToots(toots, toot.id);
        });
    }
}

const bskyRoot = getElement('bsky-comments');

if (bskyRoot) {
    var bskyCommentsLoaded = false;
    var skeetURL = bskyRoot.dataset.url;
    const toBskyURL = (uri) => {
    const splitUri = uri.split('/');
    if (splitUri[0] === 'at:') {
        return 'https://bsky.app/profile/' + splitUri[2] + '/post/' + splitUri[4];
    } else {
        return uri;
    }
}
    const toAtProtoURI = (splitUrl) => `at://${splitUrl[4]}/app.bsky.feed.post/${splitUrl[6]}`;
    const ToBskyImgURL = (did, blobLink, thumb) => `https://cdn.bsky.app/img/${thumb ? 'feed_thumbnail' : 'feed_fullsize'}/plain/${did}/${blobLink}`;
    const bskyAPI = getURI(skeetURL, toAtProtoURI);

    if (bskyAPI !== skeetURL) {

        const loadbskyAPI = async () => {
        if (bskyCommentsLoaded) return;

        if (!fedRoot) {
            bskyRoot.innerHTML = `<span id=bskyIsLoading class=loading>${i18nLoading}</span>`;
        }

        try {
                const skeetResponse = await fetch(
                    `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${bskyAPI}`
                );
                const data = await skeetResponse.json();
                checkResponseStatus(skeetResponse);

                addToCounter(data.thread.post.replyCount, data.thread.post.repostCount, data.thread.post.likeCount);

                if (!fedRoot) {
                    getElement('stats').innerHTML = renderBskyStat(data.thread.post);
                    getElement('bskyIsLoading').remove();
                }

                if (!mstdRoot) {
                    getElement('discussion-starter-content').innerHTML = `<div>${renderRichText(data.thread.post.record)}</div>`;
                }

                if (replies > 0) {
                    bskyRoot.setAttribute('role', 'feed');
                    const bskyDOM =
                        typeof DOMPurify !== 'undefined'
                            ? DOMPurify.sanitize(renderSkeets(data.thread), { RETURN_DOM_FRAGMENT: true })
                            : renderSkeets(data.thread);
                    if (fedRoot) {
                        fedRoot.appendChild(bskyDOM);
                    } else {
                        bskyRoot.appendChild(bskyDOM);
                        const bskyItems = getElements('#bsky-comments > li[data-date]');
                        sortComment(bskyItems);
                    }
                } else {
                    if (!fedRoot) {
                        bskyRoot.innerHTML = i18nNocomment;
                    }
                }

            bskyCommentsLoaded = true;
            bskyRoot.setAttribute('aria-busy', 'false');

        } catch (error) {
            console.error(`Bluesky ${i18nErr}`, error);
            bskyRoot.innerHTML = `Bluesky ${i18nErr} : ${error}`;
        }
    }

        respondToVisibility(bskyRoot, loadbskyAPI);
    }

    const renderBskyContent = (post) => `
        <div>${renderRichText(post.record)}</div>
        ${renderBskyAttachment(post)}
    `;

    const renderRichText = (record) => {
        let richText = ``

        const textEncoder = new TextEncoder();
        const utf8Decoder = new TextDecoder();
        const utf8Text = new Uint8Array(record.text.length * 3);
        textEncoder.encodeInto(record.text, utf8Text);
        var charIdx = 0;

        for (const facetIdx in record.facets) {
            const facet = record.facets[facetIdx];
            const facetFeature = facet.features[0];
            const facetType = facetFeature.$type;

            var facetLink = '#';
            if (facetType == 'app.bsky.richtext.facet#tag') {
                facetLink = `https://bsky.app/hashtag/${facetFeature.tag}`;
            } else if (facetType == 'app.bsky.richtext.facet#link') {
                facetLink = facetFeature.uri;
            } else if (facetType == 'app.bsky.richtext.facet#mention') {
                facetLink = `https://bsky.app/profile/${facetFeature.did}`;
            }

            if (charIdx < facet.index.byteStart) {
                const preFacetText = utf8Text.slice(charIdx, facet.index.byteStart);
                richText += utf8Decoder.decode(preFacetText)
            }

            const facetText = utf8Text.slice(facet.index.byteStart, facet.index.byteEnd);
            richText += `<a href='${facetLink}' target='_blank' rel='external noreferrer nofollow'>` + utf8Decoder.decode(facetText) + `</a>`;

            charIdx = facet.index.byteEnd;
        }

        if (charIdx < utf8Text.length) {
            const postFacetText = utf8Text.slice(charIdx, utf8Text.length);
            richText += utf8Decoder.decode(postFacetText);
        }

        return `<p>${richText.replace(/\n/g, `<br />`)}</p>`;
    }

    const renderBskyAttachment = (post) => {
        let attachment = ``;
        if (post.embed) {
            const did = post.author.did;
            const embedType = post.embed.$type;
            if (embedType === 'app.bsky.embed.external#view') {
                const { uri, title, description, thumb } = post.embed.external;
                if (uri.includes('.gif?')) {
                    attachment = `<img src='${uri}' title='${title}' alt='${description}' loading='lazy'>`;
                } else if (thumb) {
                    attachment = `<a href='${uri}' aria-label='${title}'><img src='${thumb}' alt='${description}' loading='lazy'></a>`
                }
            } else if (embedType === 'app.bsky.embed.images#view') {
                const images = post.record.embed.images;
                attachment = images.map(image => {
                    const thumb = ToBskyImgURL(did, image.image.ref.$link, true);
                    const src = ToBskyImgURL(did, image.image.ref.$link, false);
                    return `<a href='${src}' target='_blank'><img src='${thumb}' alt='${image.alt}' loading='lazy'></a>`;
                }).join('');
            } else if (embedType === 'app.bsky.embed.video#view') {
                const video = post.record.embed.video;
                attachment = `<video controls poster='${post.embed.thumbnail}' preload='none'><source src='https://bsky.social/xrpc/com.atproto.sync.getBlob?cid=${video.ref.$link}&did=${did}' type='${video.mimeType}'></video>`
            }
            return `<div class='attachments'>${attachment}</div>`;
        }
        return attachment;
    }

    const renderBskyStat = (post) => `
        ${renderStat(post.replyCount, toBskyURL(post.uri), i18nReplies, 'replies')}
        ${renderStat(post.repostCount, `${toBskyURL(post.uri)}/reposted-by`, i18nReblogs, 'reblogs')}
        ${renderStat(post.likeCount, `${toBskyURL(post.uri)}/liked-by`, i18nFavourites, 'favourites')}
    `;

    const renderSkeet = (comment) => {
        const replyDate = new Date(comment.post.record.createdAt);
        return `
        <li data-date='${toISOString(replyDate)}' id='${comment.post.cid}'>
          <article class='fed-comments bsky'>
            <div class='author'>
              <img src='${comment.post.author.avatar}' width=48 height=48 alt='${comment.post.author.handle}' loading='lazy' />
              <a class='has-desc' href='https://bsky.app/profile/${comment.post.author.handle}' rel='external noreferrer nofollow' aria-description='@${comment.post.author.handle}''>
                <span>${comment.post.author.displayName}</span>
              </a>
            </div>
            <section class='content'>${renderBskyContent(comment.post)}</section>
            <div>
              <div class='stat'>${renderBskyStat(comment.post)}</div>
              <a class='date' href='${toBskyURL(comment.post.uri)}' rel='ugc external noreferrer nofollow'><time datetime='${toISOString(replyDate)}'>${formatDate(replyDate)}</time></a>
            </div>
          </article>
        </li>`;
    }

    const renderSkeets = (thread) => {
        const node = document.createDocumentFragment();
        const createElementFromHTML = (htmlString) => {
            const li = document.createElement('li');
            li.innerHTML = htmlString.trim();
            return li.firstChild;
        }
        for (const comment of thread.replies) {
            const skeet = createElementFromHTML(renderSkeet(comment));
            if (comment.replies.length > 0 ) {
                const reply = document.createElement('ul');
                skeet
                    .appendChild(reply)
                    .appendChild(renderSkeets(comment));
            }
            node.appendChild(skeet);
        }
        return node;
    }
}

const sortComment = (rootItem) => {
    const items = Array.from(rootItem);
    const index = new Set();
    items.sort(({ dataset: { date: a } }, { dataset: { date: b } }) => a.localeCompare(b))
    .forEach((item) => {
        if (!index.has(item.id)) {
            index.add(item.id);
            item.parentNode.appendChild(item);
        } else {
            item.remove();
        }
    });
}

const aggregateComment = () => {
    if (mstdCommentsLoaded && bskyCommentsLoaded) {
        if (replies > 0) {
            fedRoot.setAttribute('role', 'feed');
            const fedItems = getElements('#fed-comments > li[data-date]');
            sortComment(fedItems);
        } else {
            fedRoot.innerHTML = i18nNocomment;
        }
        getElement('stats').innerHTML = `
            ${renderStat(replies, skeetURL, i18nReplies, 'replies')}
            ${renderStat(reblogs, `${skeetURL}/reposted-by`, i18nReblogs, 'reblogs')}
            ${renderStat(favourites, `${skeetURL}/liked-by`, i18nFavourites, 'favourites')}
        `;
        bskyRoot.remove();
        mstdRoot.remove();
    } else {
        window.setTimeout(aggregateComment, 100);
    }
}

if (bskyRoot && mstdRoot) {
    aggregateComment();
}