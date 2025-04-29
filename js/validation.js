// Form validation and preview for contact form

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messagePreview = document.getElementById('messagePreview');

    if (contactForm && messagePreview) {
        // Input fields and their validation rules
        const fields = {
            name: {
                element: document.getElementById('name'),
                errorElement: document.getElementById('name').nextElementSibling,
                validate: function(value) {
                    if (!value.trim()) {
                        return 'Nama tidak boleh kosong';
                    }
                    if (value.trim().length < 3) {
                        return 'Nama minimal 3 karakter';
                    }
                    return '';
                }
            },
            email: {
                element: document.getElementById('email'),
                errorElement: document.getElementById('email').nextElementSibling,
                validate: function(value) {
                    if (!value.trim()) {
                        return 'Email tidak boleh kosong';
                    }
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        return 'Format email tidak valid';
                    }
                    return '';
                }
            },
            topic: {
                element: document.getElementById('topic'),
                errorElement: document.getElementById('topic').nextElementSibling,
                validate: function(value) {
                    if (!value.trim()) {
                        return 'Silakan pilih topik pertanyaan';
                    }
                    return '';
                }
            },
            message: {
                element: document.getElementById('message'),
                errorElement: document.getElementById('message').nextElementSibling,
                validate: function(value) {
                    if (!value.trim()) {
                        return 'Pesan tidak boleh kosong';
                    }
                    if (value.trim().length < 20) {
                        return 'Pesan minimal 20 karakter';
                    }
                    return '';
                }
            }
        };

        // Live preview function
        function updatePreview() {
            const name = fields.name.element.value.trim();
            const email = fields.email.element.value.trim();
            const topic = fields.topic.element.value;
            const message = fields.message.element.value.trim();
            
            const topicText = topic ? document.querySelector(`#topic option[value="${topic}"]`).textContent : '';
            
            let previewHTML = '<div class="preview-card">';
            
            if (name || email || topic || message) {
                previewHTML += `
                    <div class="preview-header">
                        <h3>Preview Pesan</h3>
                    </div>
                    <div class="preview-body">
                        <p><strong>Nama:</strong> ${name || '(belum diisi)'}</p>
                        <p><strong>Email:</strong> ${email || '(belum diisi)'}</p>
                        <p><strong>Topik:</strong> ${topicText || '(belum dipilih)'}</p>
                        <p><strong>Pesan:</strong></p>
                        <div class="message-text">${message ? message.replace(/\n/g, '<br>') : '(belum diisi)'}</div>
                    </div>
                `;
            } else {
                previewHTML += `
                    <p class="empty-preview">Silakan isi formulir untuk melihat preview pesan Anda</p>
                `;
            }
            
            previewHTML += '</div>';
            messagePreview.querySelector('.preview-content').innerHTML = previewHTML;
        }

        // Validate a single field
        function validateField(fieldName) {
            const field = fields[fieldName];
            const value = field.element.value;
            const errorMessage = field.validate(value);
            
            if (errorMessage) {
                field.errorElement.textContent = errorMessage;
                field.errorElement.style.display = 'block';
                field.element.classList.add('error');
                return false;
            } else {
                field.errorElement.style.display = 'none';
                field.element.classList.remove('error');
                return true;
            }
        }

        // Add event listeners for real-time validation and preview
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            field.element.addEventListener('input', function() {
                validateField(fieldName);
                updatePreview();
            });
            field.element.addEventListener('blur', function() {
                validateField(fieldName);
            });
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate all fields
            Object.keys(fields).forEach(fieldName => {
                if (!validateField(fieldName)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Pesan Terkirim!</h3>
                    <p>Terima kasih ${fields.name.element.value}. Pesan Anda telah berhasil dikirim. 
                    Kami akan menghubungi Anda melalui email segera.</p>
                    <p>Nomor Tiket Anda: <strong>TK-${Math.floor(10000 + Math.random() * 90000)}</strong></p>
                `;
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                // Update preview with final message
                messagePreview.querySelector('.preview-content').innerHTML = `
                    <div class="preview-card final">
                        <div class="preview-header">
                            <h3>Pesan Terkirim</h3>
                        </div>
                        <div class="preview-body">
                            <p>Pesan Anda telah berhasil terkirim dan akan segera diproses oleh tim kami.</p>
                            <p>Simpan nomor tiket Anda untuk melacak status permintaan.</p>
                        </div>
                    </div>
                `;
            }
        });

        // Initialize preview
        updatePreview();
    }
});
