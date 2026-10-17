import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, MessageCircle, RotateCcw } from 'lucide-react';
import { contactFormDefaultValues, contactFormSchema, type ContactFormValues } from '@/features/contact/schema';
import { useContactMutation } from '@/features/contact/useContactMutation';
import { services, serviceCategories } from '@/data/services';
import { budgetRanges } from '@/data/budgetRanges';
import { isEmailJsConfigured } from '@/lib/env';
import { getContactEmail, getWhatsAppLink } from '@/lib/contact-links';
import { Button } from '@/components/ui/button';
import { Field, Input, Select, Textarea } from '@/components/ui/form-controls';

interface ContactFormProps {
  preselectedService?: string;
}

function describeError(error: unknown): string {
  const code = error instanceof Error ? error.message : '';
  if (code === 'EMAIL_NOT_CONFIGURED') return 'Online enquiries are temporarily unavailable. Please reach us on WhatsApp or email.';
  if (code === 'THROTTLED') return 'Please wait a few seconds before submitting again.';
  return 'We could not send your enquiry. Your details are still here — please try again.';
}

const fieldKeys: (keyof ContactFormValues)[] = [
  'fullName',
  'email',
  'phone',
  'service',
  'eventDate',
  'city',
  'budget',
  'guestCount',
  'message',
  'consent',
];

export function ContactForm({ preselectedService }: ContactFormProps) {
  const mutation = useContactMutation();
  const [sent, setSent] = useState(false);
  const configured = isEmailJsConfigured();
  const whatsapp = getWhatsAppLink('Hello Aura Events, I would like to enquire about an event.');
  const email = getContactEmail();

  const defaultService =
    preselectedService && services.some((s) => s.slug === preselectedService)
      ? preselectedService
      : contactFormDefaultValues.service;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitted },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { ...contactFormDefaultValues, service: defaultService },
  });

  const submit = async (values: ContactFormValues) => {
    try {
      await mutation.mutateAsync(values);
      setSent(true);
      reset({ ...contactFormDefaultValues, service: defaultService });
      toast.success('Enquiry sent', { description: 'Thank you — our team will be in touch shortly.' });
    } catch (e) {
      toast.error('Enquiry not sent', { description: describeError(e) });
    }
  };

  const onSubmit = handleSubmit(submit);
  const errorList = fieldKeys.filter((k) => errors[k]);
  const describedBy = (key: keyof ContactFormValues) => (errors[key] ? `${key}-error` : undefined);

  if (!configured) {
    return (
      <div className="rounded-[1.5rem] border border-sand bg-ivory/60 p-8">
        <AlertCircle aria-hidden className="size-6 text-bronze" />
        <h2 className="mt-4 text-3xl text-midnight">Online enquiries are coming soon</h2>
        <p className="mt-3 text-sm leading-relaxed text-mist">
          Our enquiry form is being set up. In the meantime, please reach out directly and we will respond promptly.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {whatsapp ? (
            <Button asChild>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden className="size-4" />
                WhatsApp us
              </a>
            </Button>
          ) : null}
          {email ? (
            <Button asChild variant="outline-dark">
              <a href={`mailto:${email}`}>Email {email}</a>
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  if (sent) {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-start py-10">
        <span className="flex size-16 items-center justify-center rounded-full bg-midnight text-champagne">
          <CheckCircle2 aria-hidden className="size-7" />
        </span>
        <h2 className="mt-8 text-4xl text-midnight">Thank you — your enquiry is on its way.</h2>
        <p className="mt-4 max-w-md text-mist">
          A member of our team will review your brief and reply within one to two business days.
        </p>
        <Button variant="outline-dark" className="mt-10" onClick={() => setSent(false)}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7" aria-describedby="form-note">
      <p id="form-note" className="text-sm text-mist">
        Fields marked <span className="text-bronze">*</span> are required.
      </p>

      {isSubmitted && errorList.length > 0 ? (
        <div role="alert" className="rounded-2xl border border-red-800/20 bg-red-50 px-5 py-4 text-sm text-red-900">
          <p className="font-semibold">Please check {errorList.length === 1 ? 'one field' : `${errorList.length} fields`}:</p>
          <ul className="mt-2 list-disc space-y-0.5 pl-5">
            {errorList.map((key) => (
              <li key={key}>
                <a href={`#${key}`} className="underline underline-offset-2">
                  {errors[key]?.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {mutation.isError ? (
        <div role="alert" className="flex flex-col gap-4 rounded-2xl border border-red-800/20 bg-red-50 px-5 py-4 text-sm text-red-900 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2">
            <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
            {describeError(mutation.error)}
          </p>
          <div className="flex shrink-0 gap-2">
            <Button type="button" size="sm" variant="dark" onClick={() => submit(getValues())}>
              <RotateCcw aria-hidden className="size-3.5" />
              Retry
            </Button>
            {whatsapp ? (
              <Button asChild size="sm" variant="outline-dark">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="eyebrow mb-6 text-bronze">About you</legend>
        <Field id="fullName" label="Full name" required error={errors.fullName?.message}>
          <Input id="fullName" autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={describedBy('fullName')} {...register('fullName')} />
        </Field>
        <Field id="email" label="Email" required error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} {...register('email')} />
        </Field>
        <Field id="phone" label="Phone" required error={errors.phone?.message} hint="Include country code, e.g. +91" className="sm:col-span-2">
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
            {...register('phone')}
          />
        </Field>
      </fieldset>

      <fieldset className="grid gap-6 border-t border-sand pt-8 sm:grid-cols-2">
        <legend className="eyebrow mb-6 pt-8 text-bronze">Your event</legend>
        <Field id="service" label="Event type / service" required error={errors.service?.message} className="sm:col-span-2">
          <Select id="service" aria-invalid={Boolean(errors.service)} aria-describedby={describedBy('service')} {...register('service')}>
            {serviceCategories.map((cat) => (
              <optgroup key={cat.id} label={cat.label}>
                {services
                  .filter((s) => s.category === cat.id)
                  .map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
              </optgroup>
            ))}
          </Select>
        </Field>
        <Field id="city" label="Event city" required error={errors.city?.message}>
          <Input id="city" autoComplete="address-level2" placeholder="e.g. Mumbai" aria-invalid={Boolean(errors.city)} aria-describedby={describedBy('city')} {...register('city')} />
        </Field>
        <Field id="eventDate" label="Preferred date" error={errors.eventDate?.message}>
          <Input id="eventDate" type="date" aria-invalid={Boolean(errors.eventDate)} aria-describedby={describedBy('eventDate')} {...register('eventDate')} />
        </Field>
        <Field id="budget" label="Estimated budget (INR)">
          <Select id="budget" {...register('budget')}>
            {budgetRanges.map((b) => (
              <option key={b.value || 'none'} value={b.value}>
                {b.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="guestCount" label="Approximate guests" error={errors.guestCount?.message}>
          <Input id="guestCount" inputMode="numeric" placeholder="e.g. 250" aria-invalid={Boolean(errors.guestCount)} aria-describedby={describedBy('guestCount')} {...register('guestCount')} />
        </Field>
        <Field id="message" label="Tell us about your vision" required error={errors.message?.message} className="sm:col-span-2">
          <Textarea
            id="message"
            rows={5}
            placeholder="Occasion, theme ideas, venue preferences, must-haves…"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message')}
            {...register('message')}
          />
        </Field>
      </fieldset>

      <div>
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mist">
          <input
            id="consent"
            type="checkbox"
            className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-sand accent-midnight"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy('consent')}
            {...register('consent')}
          />
          <span>
            I agree to the{' '}
            <Link to="/privacy-policy" className="font-medium text-midnight underline underline-offset-2">
              privacy policy
            </Link>{' '}
            and consent to Aura Events contacting me about this enquiry. <span className="text-bronze">*</span>
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="mt-1.5 pl-8 text-xs font-medium text-red-800">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="flex flex-col gap-3 border-t border-sand pt-8 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" variant="dark" disabled={mutation.isPending} aria-busy={mutation.isPending}>
          {mutation.isPending ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Submit enquiry
              <ArrowRight aria-hidden className="size-4" />
            </>
          )}
        </Button>
        {whatsapp ? (
          <Button asChild size="lg" variant="outline-dark">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle aria-hidden className="size-4" />
              Prefer WhatsApp?
            </a>
          </Button>
        ) : null}
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {mutation.isPending ? 'Sending your enquiry' : ''}
      </p>
    </form>
  );
}
