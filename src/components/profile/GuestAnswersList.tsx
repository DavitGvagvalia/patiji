import type { GuestAnswer } from '../../types/profile'

interface GuestAnswersListProps {
  answers: GuestAnswer[]
  title: string
  emptyMessage: string
}

export function GuestAnswersList({ answers, title, emptyMessage }: GuestAnswersListProps) {
  return (
    <section className="rounded-lg border border-brand-soft bg-white p-6">
      <h2 className="text-xl font-semibold text-brand-navy">{title}</h2>
      {answers.length === 0 ? (
        <p className="mt-4 rounded-lg border border-dashed border-brand-soft bg-brand-soft/30 p-5 text-sm leading-7 text-brand-black/70">
          {emptyMessage}
        </p>
      ) : (
        <ul className="mt-5 divide-y divide-brand-soft">
          {answers.map((answer) => (
            <li key={answer.id} className="py-4 text-sm">
              <p className="font-semibold text-brand-black">{answer.guestName}</p>
              <p className="mt-1 text-brand-black/70">
                {answer.attending ? 'Attending' : 'Not attending'} · Party of {answer.partySize}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
